// Regular expressions to extract values
export const securityHashRegex = /securityHash=([^&']+)/;
export const mousePatternRegex = /mousePattern=([^&']+)/;
export const gameDayRegex = /gameDay=([^&'"]+)/;
export const ipRegex = /ip=([^&'"]+)/;
export const serverNameRegex = /serverName=([^&'"]+)/;
export const citizenLevelRegex = /citizenLevel=([^&'"]+)/;
export const citizenIdRegex = /citizenId=([^&'"]+)/;
export const myCitizenshipRegex = /myCitizenship=([^&'"]+)/;
export const fightUrlRegex = /url: "([^'"]+)"/;

export const sendFightRequestRegex = /function sendFightRequest\(.*?\) \{([\s\S]*?)\}/;
