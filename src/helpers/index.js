import Cookies from 'js-cookie';

function setCookie(name, token, expiresIn) {
    Cookies.set(name, token, { expires: expiresIn, path: '/' });
}

function getCookie(name) {
    return Cookies.get(name);
}

function deleteCookie(name) {
    Cookies.remove(name, { path: '/' });
}

// Function to set a value in localStorage
function setValueInLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// Function to get a value from localStorage
function getValueFromLocalStorage(key) {
    return localStorage.getItem(key);
}

// Function to delete a value from localStorage
function deleteValueFromLocalStorage(key) {
    localStorage.removeItem(key);
}

function isTimePassed() {

    const storedTime = getCookie("expireDate");

    // Get the current time
    console.log(storedTime)
    const currentTime = new Date();

    // Split the stored time into hours, minutes, and seconds
    const [storedHours, storedMinutes, storedSeconds] = storedTime.split(':').map(Number);

    // Create a new Date object for the stored time with today's date
    const storedDate = new Date(currentTime);
    storedDate.setHours(storedHours, storedMinutes, storedSeconds, 0);

    // Compare the stored time with the current time
    return storedDate <= currentTime;

}


function capitalizeKeysToJson(obj) {
    function transform(o) {
        if (Array.isArray(o)) {
            return o.map(transform);
        } else if (o && typeof o === "object") {
            const newObj = {};
            for (const key in o) {
                if (Object.hasOwn(o, key)) {
                    const newKey =
                        typeof key === "string" && key.length > 0
                            ? key.charAt(0).toUpperCase() + key.slice(1)
                            : key;
                    newObj[newKey] = transform(o[key]);
                }
            }
            return newObj;
        }
        return o; // مقدارها دست نخورده می‌مانند
    }

    return JSON.stringify(transform(obj), null, 2); // خروجی JSON string با فرمت
}

function generateSlug(title) {
    if (!title) return "";
    let slug = title.toLowerCase();
    slug = slug.replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "");
    slug = slug.replace(/\s+/g, "-").replace(/-+/g, "-");
    slug = slug.replace(/^-+|-+$/g, "");
    return slug;
}


export {
    setCookie,
    getCookie,
    deleteCookie,
    setValueInLocalStorage,
    getValueFromLocalStorage,
    deleteValueFromLocalStorage,
    isTimePassed,
    capitalizeKeysToJson,
    generateSlug
};