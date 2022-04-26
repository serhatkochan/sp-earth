export const SELECT_LANGUAGE = "SELECT_LANGUAGE";

export function selectLanguage(language) {
    return{
        type: SELECT_LANGUAGE,
        payload: language
    }
}
