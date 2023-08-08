/* eslint-disable no-unreachable */
// import { useMemo, useState } from "react";
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TableRow,
  TableCell,
} from "@mui/material";
// import * as Yup from "yup";
// components
import Page from "../components/Page";
// import Iconify from "../components/Iconify";
import CommonTable from "src/components/CommonTable";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MoreMenu from "src/components/CommonTable/MoreMenu";
import Iconify from "src/components/Iconify";
import { useEffect, useMemo, useState } from "react";
import FormSidebar from "src/layouts/dashboard/FormSidebar";
import { useForm } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import { useAuth } from "src/utils/AuthContext";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "fName", label: "First Name", alignRight: false },
  { id: "lName", label: "Last Name", alignRight: false },
  { id: "contact", label: "Contact", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "areYou", label: "Type", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "message", label: "Message", alignRight: false },
  { id: "geosInterested", label: "Geo Interested", alignRight: false },
  { id: "productsInterested", label: "Interested In", alignRight: false },
  { id: "trafficTypes", label: "Traffic Types", alignRight: false },
];

// ----------------------------------------------------------------------

export default function Inquiries() {
  const [openForm, setOpenForm] = useState(false);
  const isEditMode = typeof openForm == "object";
  const { inquiriesApi } = useAuth();
  const { data, isLoading } = inquiriesApi;

  const onEdit = (item) => {
    setOpenForm(item);
  };

  return (
    <Page title="FAQ">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Inquires
          </Typography>
        </Stack>
        <Card>
          <CommonTable
            loading={isLoading}
            tableTitle="FAQ"
            tableHead={TABLE_HEAD}
            list={data || []}
            RowItem={(params) => <RowItem {...params} />}
          />
        </Card>
      </Container>
    </Page>
  );
}

const RowItem = ({ row, onEdit, onDelete }) => {
  const {
    id,
    fName,
    lName,
    email,
    areYou,
    company,
    contact,
    message,
    geosInterested,
    productsInterested,
    trafficTypes,
  } = row;

  return (
    <TableRow hover key={id}>
      <TableCell align="left">{fName}</TableCell>
      <TableCell align="left">{lName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{contact}</TableCell>
      <TableCell align="left">{areYou}</TableCell>
      <TableCell align="left">{company}</TableCell>
      <TableCell align="left">{message}</TableCell>
      <TableCell align="left">{geosInterested}</TableCell>
      <TableCell align="left">{productsInterested}</TableCell>
      <TableCell align="left">{trafficTypes}</TableCell>
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
  } = props;

  const onSubmit = async (vals) => {
    let params = {
      question: vals.question || "",
      answer: vals.answer || "",
    };
    if (mode == "CREATE") {
      onCreate(params);
    }
    if (mode == "UPDATE") {
      onUpdate({
        ...params,
        id: openForm.id,
      });
    }
    setOpenForm(false);
  };

  let defaultValues = useMemo(() => {
    if (mode === "UPDATE") {
      return {
        question: openForm.question || "",
        answer: openForm.answer || "",
      };
    }
    return {
      question: "",
      answer: "",
    };
  }, [openForm]);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      question: Yup.string().required("Question is required!"),
      answer: Yup.string().required("Answer is required!"),
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  return (
    <FormSidebar
      formTitle={mode === "UPDATE" ? "Update FAQ" : "Create FAQ"}
      isOpenSidebar={openForm}
      onCloseSidebar={() => setOpenForm(false)}
      methods={methods}
      onSubmit={onSubmit}
      onDelete={onDelete}
      isSubmitting={isSubmitting}
    >
      <RHFTextField name="question" label="Question" multiline maxRows={3} />
      <RHFTextField name="answer" label="Answer" multiline maxRows={8} />
    </FormSidebar>
  );
};
