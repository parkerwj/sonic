import { logfile_message } from "./logfile"
import { resourcemanager_getJsonFile } from "./resourcemanager"

let DEFAULT_LANGUAGE_FILEPATH = "data/languages/english.json";
//let DEFAULT_LANGUAGE_FILEPATH = "data/languages/deutsch.json";
//let DEFAULT_LANGUAGE_FILEPATH = "data/languages/dutch.json";
//let DEFAULT_LANGUAGE_FILEPATH = "data/languages/francais.json";
//let DEFAULT_LANGUAGE_FILEPATH = "data/languages/indonesian.json";
//let DEFAULT_LANGUAGE_FILEPATH = "data/languages/italiano.json";
//let DEFAULT_LANGUAGE_FILEPATH = "data/languages/polish.json";
//let DEFAULT_LANGUAGE_FILEPATH = "data/languages/ptbr.json";

export interface strings_t {
  [key: string]: string
}

let strings:strings_t = {};

/**
 * lang_loadfile()
 * Loads a language definition file
 */
export const lang_loadfile = async (filepath:string) => {
  logfile_message(`lang_loadfile("${filepath}")...`);
  const data = await resourcemanager_getJsonFile(filepath);
  strings = <strings_t>data;
};

/**
 * lang_init()
 * Initializes the language module
 */
export const lang_init = async (lang:string) => {
  logfile_message("Initializing the language module");
  DEFAULT_LANGUAGE_FILEPATH = lang || DEFAULT_LANGUAGE_FILEPATH;
  await lang_loadfile(DEFAULT_LANGUAGE_FILEPATH);
  logfile_message("lang_init() ok!");
};

/**
 * lang_release()
 * Releases the language module
 */
export const lang_release = ():void => {

};

/**
 * lang_getstring()
 * Retrieves some string from the language definition file
 */
export const lang_getstring = (desired_key:string):string => {
  return strings[desired_key] || desired_key;
};

/**
 * lang_get()
 * Like lang_getstring(), but returns the string as a static char*
 */
export const lang_get = (desired_key:string):string => {
  return lang_getstring(desired_key);
};
