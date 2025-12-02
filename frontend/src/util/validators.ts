import { hasMaxLength, hasMinLength, isEmpty } from "./validation";

const TITLE_MIN_LENGTH = 1;
const TITLE_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;

export function validateCreateTopicAction({ title, terms, }: { title: string; terms: boolean; }) {
  const errors = [];
  if (
    isEmpty(title) ||
    !hasMinLength(title!, TITLE_MIN_LENGTH) ||
    !hasMaxLength(title!, TITLE_MAX_LENGTH)
  ) {
    errors.push(
      `Title length must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters.`
    );
  }
  if (!terms) {
    errors.push("You must agree to the terms and conditions.");
  }
  return errors;
}

export function validateAuthAction({ email, password }: { email: string; password: string; }) {
  const errors = [];

  if (isEmpty(email)) {
    errors.push("Please, enter a valid email");
  }
  if (isEmpty(password) || !hasMinLength(password!, PASSWORD_MIN_LENGTH)) {
    errors.push(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
    );
  }
  return errors;
}

export function validateSendMessageAction({ topicId, text }: { topicId: string | undefined; text: string | undefined; }) {
  const errors = [];
  if (!topicId) {
    errors.push("Invalid topic.");
  }
  if (!text) {
    errors.push("Message is empty.");
  }
  return errors;
}