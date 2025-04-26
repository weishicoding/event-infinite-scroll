export type LanguageContent = {
  [key: string]: string;
};

// this also can get from system if it is in the real project
export const currentLanguage = "en_US";

export function getLocalizedContent(
  content: LanguageContent | undefined,
  language: string,
  defaultLanguage: string = currentLanguage
) {
  if (!content) return "";

  if (content[language]) {
    return content[language];
  }

  if (content[defaultLanguage]) {
    return content[defaultLanguage];
  }

  // if there no language or defualt language, use the first key
  const firstAvailableKey = Object.keys(content)[0];
  return firstAvailableKey ? content[firstAvailableKey] : "";
}
