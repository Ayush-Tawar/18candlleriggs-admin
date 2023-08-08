import eventsController from "./eventsController";
import faqController from "./faqController";

export const types = {
  EVENTS: "Events",
  FAQ: "FAQ",
};

export const controller = {
  [types.EVENTS]: eventsController,
  [types.FAQ]: faqController,
};
