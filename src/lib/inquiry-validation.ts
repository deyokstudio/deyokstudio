export const FORMSPREE_ENDPOINT = "https://formspree.io/f/moeezqqb";
export type InquiryField = "fullName" | "email" | "country" | "service" | "description" | "reference";
export function invalidInquiryFields(data: Record<InquiryField, string>): InquiryField[] {
  const invalid: InquiryField[] = [];
  if (data.fullName.trim().length < 2) invalid.push("fullName");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) invalid.push("email");
  if (data.country.trim().length < 2) invalid.push("country");
  if (!data.service) invalid.push("service");
  if (data.description.trim().length < 10) invalid.push("description");
  if (data.reference.trim() && !/^https?:\/\/\S+\.\S+$/i.test(data.reference.trim())) invalid.push("reference");
  return invalid;
}