import React, { useMemo, useState } from "react";
import Page from "../components/Page";
import { Stack, Container, Button, Typography, TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuth } from "src/utils/AuthContext";
import _ from "lodash";
import CommonSpinner from "src/components/CommonSpinner";
import { LoadingButton } from "@mui/lab";

export default function PrivacyPolicy() {
  const { cmsApi } = useAuth();
  const { data, isLoading, isSubmitting, onUpdate } = cmsApi;
  const [editor, setEditor] = useState();
  const currentData = useMemo(() => {
    if (!_.isEmpty(data) && data.length > 1) {
      return data[1];
    }
  }, [data]);
  const [titleData, setTitleData] = useState(currentData?.title);

  const onSave = () => {
    onUpdate({
      ...currentData,
      content: editor.getData(),
      title: titleData,
    });
  };

  const handleChange = (e) => {
    setTitleData(e.target.value);
  };

  return (
    <Page>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {currentData?.title}
          </Typography>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            onClick={onSave}
          >
            Save
          </LoadingButton>
        </Stack>
        {isLoading ? (
          <CommonSpinner />
        ) : (
          <>
            <TextField
              required
              id="filled-basic"
              variant="filled"
              name="title"
              onChange={handleChange}
              label={currentData?.title}
              sx={{ marginBottom: "20px" }}
            />
            <CKEditor
              data={currentData?.content ?? ""}
              onReady={(e) => setEditor(e)}
              editor={ClassicEditor}
            />
          </>
        )}
      </Container>
    </Page>
  );
}
