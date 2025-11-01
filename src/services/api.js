// utils/api.js
import Cookies from "js-cookie"; // npm install js-cookie

export async function SP_fetch(procedureName, parameters = {}, hasDataTable = true) {
    const url = "https://pool.techa.me/api/ExecuteTSql/ExecuteStoredProcedure";

    const body = {
        ProcedureName: procedureName,
        ProjectId: 1011,
        HasDataTable: hasDataTable,
    };

    if (Object.keys(parameters).length > 0) {
        const formattedParams = {};
        for (const [key, value] of Object.entries(parameters)) {
            const formattedKey = key.startsWith("@") ? key : `@${key}`;
            formattedParams[formattedKey] = value.toString();
        }
        body.Parameters = formattedParams;
    }

    // خواندن توکن از کوکی
    const token = Cookies.get("token");

    console.log("Token : ", token);

    const headers = {
        "Content-Type": "application/json",
    };

    // اگر نیاز به توکن داری این بخش رو فعال کن
    // if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
    // }

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const data = await response.json();

    let ds = data?.Data?.Dataset;
    if (typeof ds === "string") {
        try {
            ds = JSON.parse(ds);
        } catch {
            ds = [];
        }
    }
    if (!Array.isArray(ds)) ds = [];

    return {
        ...data,
        Data: {
            ...data.Data,
            Dataset: ds,
        },
    };
}
