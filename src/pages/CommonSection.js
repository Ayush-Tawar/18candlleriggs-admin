// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Button,
  TableRow,
  TableCell,
  Grid,
} from "@mui/material";
// components
import Page from "../components/Page";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "src/utils/AuthContext";
import _ from "lodash";
import { useMemo, useState } from "react";
import Iconify from "src/components/Iconify";
import CommonTable from "src/components/CommonTable";
import MoreMenu from "src/components/CommonTable/MoreMenu";
import { controller } from "src/controllers";
import CommonForm from "src/layouts/dashboard/CommonForm";
import dayjs from "dayjs";
import { getValueFromObject, isIsoDate } from "src/utils/commons";

export default function CommonSection({ type }) {
  const [openForm, setOpenForm] = useState(false);
  const isEditMode = typeof openForm == "object";
  const { apis } = useAuth();
  const api = apis[controller[type]["apiHook"]];
  const tableHead = controller[type]["tableHead"];
  const tableActions = controller[type]["tableActions"];
  const sectionTitle = controller[type]["sectionTitle"];
  const disablePagination = !controller[type]["enablePagination"];

  const {
    onUpdate,
    onCreate,
    onDelete,
    isSubmitting,
    isLoading,
    setIsLoading,
    submit,
    data,
  } = api;
  const onEdit = (item) => {
    setOpenForm(item);
  };

  return (
    <Page title={sectionTitle}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {sectionTitle}
          </Typography>
          {tableActions?.create && !openForm && (
            <Button
              onClick={() => setOpenForm(true)}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add
            </Button>
          )}
        </Stack>
        {openForm ? (
          <Card>
            <Form
              mode={isEditMode ? "UPDATE" : "CREATE"}
              isSubmitting={isSubmitting}
              openForm={openForm}
              setOpenForm={setOpenForm}
              onUpdate={onUpdate}
              onCreate={onCreate}
              onDelete={onDelete}
              type={type}
            />
          </Card>
        ) : (
          <Card>
            <CommonTable
              api={api}
              loading={isLoading}
              tableTitle={type}
              tableHead={tableHead}
              list={data || []}
              disablePagination={disablePagination}
              RowItem={(params) => {
                return (
                  <RowItem
                    {...params}
                    onEdit={onEdit}
                    type={type}
                    onDelete={onDelete}
                  />
                );
              }}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}

const RowItem = ({ row, onEdit, onDelete, type }) => {
  const { id } = row;
  const tableActions = controller[type]["tableActions"];
  const tableRowRender = controller[type]["tableRowRender"];

  const menuProps = {};
  if (tableActions.edit) {
    menuProps.onEdit = () => onEdit(row);
  }
  if (tableActions.delete) {
    menuProps.onDelete = () => onDelete(id);
  }
  return (
    <TableRow hover key={id}>
      {tableRowRender(row)}
      <TableCell align="right">
        <MoreMenu {...menuProps} />
      </TableCell>
    </TableRow>
  );
};

const Form = (props) => {
  const {
    openForm,
    setOpenForm,
    isSubmitting,
    mode,
    onUpdate,
    onCreate,
    onDelete,
    type,
  } = props;
  const formFieldsArray = controller[type]["formFields"];
  const formSchema = controller[type]["formSchema"];
  const formTitle = controller[type]["formTitle"];
  const formLayout = controller[type]["formLayout"];
  const formDefaultValues = controller[type]["formDefaultValues"];

  const onSubmit = async (vals) => {
    let params = {};
    formFieldsArray.map((f) => {
      if (vals[f.formProps.name] instanceof dayjs) {
        params[f.formProps.name] = vals[f.formProps.name].toDate();
        return;
      }
      params[f.formProps.name] = getValueFromObject(vals, f.formProps.name);
    });

    if (mode == "CREATE") {
      onCreate(params);
    }
    if (mode == "UPDATE") {
      console.log("updated");
      onUpdate({
        ...params,
        id: openForm.id,
      });
    }
    setOpenForm(false);
  };

  let defaultValues = useMemo(() => {
    let params = {};
    if (mode === "UPDATE") {
      formFieldsArray.map((f) => {
        if (isIsoDate(openForm[f.formProps.name])) {
          //Parse date
          params[f.formProps.name] = dayjs(
            getValueFromObject(openForm, f.formProps.name),
          );
          return;
        }
        params[f.formProps.name] = getValueFromObject(
          openForm,
          f.formProps.name,
        );
      });
      return params;
    }
    formFieldsArray.map((f) => {
      params[f.formProps.name] = getValueFromObject(
        formDefaultValues,
        f.formProps.name,
      );
    });
    return params;
  }, [openForm]);

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  return (
    <CommonForm
      formTitle={mode === "UPDATE" ? formTitle.update : formTitle.create}
      onClose={() => setOpenForm(false)}
      methods={methods}
      onSubmit={onSubmit}
      onDelete={onDelete}
      isSubmitting={isSubmitting}
    >
      {formLayout === false ? (
        <Grid container spacing={3}>
          {formFieldsArray.map((field, index) => (
            <Grid item xs={6} key={field.name || index}>
              <field.component {...field.formProps} />
            </Grid>
          ))}
        </Grid>
      ) : (
        formLayout
      )}
    </CommonForm>
  );
};
