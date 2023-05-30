import axios from "axios";
import moment from "moment";
const API_URL = "https://calendar-api--chaitanyashar21.repl.co/";

const API_INSTANCE = axios.create({
    baseURL: API_URL,
});

const getAllEvents = async () => {
    const data = await API_INSTANCE.get("/");

    return data;
}

export default getAllEvents;
