const admin = require("firebase-admin");
import { getDadosHistoricos } from "./getDadosHistoricos";
import { sendDadosHistoricos } from "./sendDadosHistoricos";
admin.initializeApp();

module.exports = {
    getDadosHistoricos,
    sendDadosHistoricos,
}
