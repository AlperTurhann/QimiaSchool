type DeMessages = typeof import("@/messages/de.json");
type GbMessages = typeof import("@/messages/gb.json");
type TrMessages = typeof import("@/messages/tr.json");

declare interface IntlMessages extends DeMessages, GbMessages, TrMessages {}

type RoleKeys = keyof IntlMessages["options"]["roles"];
type AccessLevelKeys = keyof IntlMessages["options"]["accessLevels"];
type APIErrorsKeys = keyof IntlMessages["api"]["errors"];
type APISuccessKeys = keyof IntlMessages["api"]["success"];
