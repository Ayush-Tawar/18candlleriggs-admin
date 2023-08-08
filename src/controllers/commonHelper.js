import { RHFTextField } from "src/components/hook-form";
import RHFUpload from "src/components/hook-form/RHFUpload";
import * as Yup from "yup";
import _ from "lodash";

export const types = {
  INSIGHTS: "Insights",
  FAQ: "FAQ",
  OUR_PROCESS: "Our Process",
  SERVICES: "Services",
  HERO_SECTION: "Hero Section",
  CONTACT_US: "Contact us",
  SEO: "Seo",
  TESTIMONIALS: "Testimonials",
};

export const apiHook = {
  [types.INSIGHTS]: "insightsApi",
  [types.FAQ]: "faqsApi",
  [types.OUR_PROCESS]: "ourProcessApi",
  [types.SERVICES]: "servicesApi",
  [types.HERO_SECTION]: "heroApi",
  [types.CONTACT_US]: "contactApi",
  [types.SEO]: "seoApi",
  [types.TESTIMONIALS]: "testimonialApi",
};

export const formFields = {
  [types.INSIGHTS]: [
    {
      component: RHFTextField,
      formProps: {
        name: "title",
        label: "Insight Name",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "link",
        label: "Insight Link",
        multiline: true,
        maxRows: 3,
      },
    },
  ],
  [types.FAQ]: [
    {
      component: RHFTextField,
      formProps: {
        name: "question",
        label: "FAQ Question",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "answer",
        label: "FAQ Answer",
        multiline: true,
        maxRows: 8,
      },
    },
  ],
  [types.OUR_PROCESS]: [
    {
      component: RHFTextField,
      formProps: {
        name: "title",
        label: "Our Process",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "imgAltText",
        label: "Image alt text",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFUpload,
      formProps: {
        name: "ourProcessSectionImage",
        label: "Our Process Image",
        buttonText: "Upload Image",
        aspectRatio: 1,
      },
    },
  ],
  [types.SERVICES]: [
    {
      component: RHFTextField,
      formProps: {
        name: "title",
        label: "Services",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "description",
        label: "Services Description",
        multiline: true,
        maxRows: 3,
      },
    },
  ],
  [types.HERO_SECTION]: [
    {
      component: RHFTextField,
      formProps: {
        name: "title",
        label: "Hero Section",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "imgAltText",
        label: "Image alt text",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFUpload,
      formProps: {
        name: "heroSectionImage",
        label: "Hero Section Image",
        buttonText: "Upload Image",
        aspectRatio: 2.4,
      },
    },
  ],
  [types.CONTACT_US]: [
    {
      component: RHFTextField,
      formProps: {
        name: "name",
        label: "Name",
        multiline: true,
        maxRows: 3,
      },
    },

    {
      component: RHFTextField,
      formProps: {
        name: "email",
        label: "E-mail",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "contactNumber",
        label: "Contact Number",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "message",
        label: "Message",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "company",
        label: "Company Name",
        multiline: true,
        maxRows: 3,
      },
    },
  ],
  [types.SEO]: [
    {
      component: <></>,
      formProps: {
        name: "page",
        label: "Page",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "pageTitle",
        label: "Page Title",
        multiline: true,
        maxRows: 3,
      },
    },

    {
      component: RHFTextField,
      formProps: {
        name: "seoTitle",
        label: "SEO Title",
        multiline: true,
        maxRows: 3,
      },
    },
    {
      component: RHFTextField,
      formProps: {
        name: "seoDescription",
        label: "SEO Description",
        multiline: true,
        maxRows: 3,
      },
    },
  ],
  [types.TESTIMONIALS]: [
    {
      component: RHFTextField,
      formProps: {
        name: "clientTestimonial",
        label: "Testimonial",
        multiline: true,
        maxRows: 3,
      },
    },
  ],
};

export const tableHead = {
  [types.INSIGHTS]: [
    { id: "title", label: "Title", alignRight: false },
    { id: "link", label: "Insight Link", alignRight: false },
    { id: null, label: "Actions", alignRight: true },
  ],
  [types.FAQ]: [
    { id: "question", label: "Question", alignRight: false },
    { id: "answer", label: "Answer", alignRight: false },
    { id: "action", label: "Actions", alignRight: true },
  ],
  [types.OUR_PROCESS]: [
    { id: "title", label: "Title", alignRight: false },
    { id: "imgAltText", label: "Image Alt Text", alignRight: false },
    { id: "link", label: "Our Process Image", alignRight: false },
    { id: null, label: "Actions", alignRight: true },
  ],
  [types.SERVICES]: [
    { id: "title", label: "Title", alignRight: false },
    { id: "description", label: "Services Description", alignRight: false },
    { id: null, label: "Actions", alignRight: true },
  ],
  [types.HERO_SECTION]: [
    { id: "title", label: "Title", alignRight: false },
    { id: "imgAltText", label: "Image Alt Text", alignRight: false },
    {
      id: "heroSectionImage",
      label: "Hero Section Image",
      alignRight: false,
    },
    { id: null, label: "Actions", alignRight: true },
  ],
  [types.CONTACT_US]: [
    { id: "name", label: "Name", alignRight: false },
    { id: "email", label: "E-mail", alignRight: false },
    { id: "contactNumber", label: "Contact us ", alignRight: false },
    { id: "message", label: "Message", alignRight: false },
    { id: "company", label: "Company Name", alignRight: false },
    { id: null, label: "Actions", alignRight: true },
  ],
  [types.SEO]: [
    { id: "page", label: "Page", alignRight: false },
    { id: "pageTitle", label: "Page Title", alignRight: false },
    { id: "seoTitle", label: "SEO Title", alignRight: false },
    { id: "seoDescription", label: "SEO Description", alignRight: false },
  ],
  [types.TESTIMONIALS]: [
    { id: "clientTestimonial", label: "Testimonial", alignRight: false },
  ],
};

export const tableActions = {
  [types.INSIGHTS]: { edit: true, delete: true },
  [types.FAQ]: { edit: true, delete: true },
  [types.OUR_PROCESS]: { edit: true, delete: true },
  [types.SERVICES]: { edit: true, delete: false },
  [types.HERO_SECTION]: { edit: true, delete: false },
  [types.CONTACT_US]: { edit: true, delete: false },
  [types.SEO]: { edit: true, delete: false },
  [types.TESTIMONIALS]: { edit: true, delete: true },
};

export const formSchemas = {
  [types.INSIGHTS]: Yup.object().shape({
    title: Yup.string().required("Insight description is required"),
    link: Yup.string().required("Insight link is required"),
  }),
  [types.FAQ]: Yup.object().shape({
    question: Yup.string().required("Question is required!"),
    answer: Yup.string().required("Answer is required!"),
  }),
  [types.OUR_PROCESS]: Yup.object().shape({
    title: Yup.string().required("Our Process title is required"),
    ourProcessSectionImage: Yup.mixed().test(
      "required",
      "Image is required",
      (value) => !_.isEmpty(value) || value instanceof File,
    ),
  }),
  [types.SERVICES]: Yup.object().shape({
    title: Yup.string().required("Service title is required"),
    description: Yup.string().required("Service Description is Required"),
  }),
  [types.HERO_SECTION]: Yup.object().shape({
    title: Yup.string().required("Hero Image title is required"),
    heroSectionImage: Yup.mixed().test(
      "required",
      "Image is required",
      (value) => !_.isEmpty(value) || value instanceof File,
    ),
  }),
  [types.CONTACT_US]: Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().required("Email is Required"),
    contactNumber: Yup.string().required("Contact Number is Required"),
    message: Yup.string().required("Message is Required"),
    company: Yup.string().required("Company is Required"),
  }),
  [types.SEO]: Yup.object().shape({
    pageTitle: Yup.string().required("Page Title is Required"),
    page: Yup.string().required("Page is Required"),
    seoTitle: Yup.string().required("SEO Title is Required"),
    seoDescription: Yup.string().required("SEO Description is Required"),
  }),
  [types.TESTIMONIALS]: Yup.object().shape({
    clientTestimonial: Yup.string().required("Testimonial is Required"),
  }),
};

export const formTitle = {
  [types.INSIGHTS]: { update: "Update Insight", create: "Create Insight" },
  [types.FAQ]: { update: "Update FAQ", create: "Create FAQ" },
  [types.OUR_PROCESS]: { update: "Update Process", create: "Create Process" },
  [types.SERVICES]: { update: "Update Service", create: "Create Service" },
  [types.HERO_SECTION]: { update: "Update Hero", create: "Create Hero" },
  [types.CONTACT_US]: { update: "Update Contact", create: "Create Contact" },
  [types.SEO]: { update: "Update SEO", create: "Create SEO" },
  [types.TESTIMONIALS]: { update: "Update SEO", create: "Create SEO" },
};
