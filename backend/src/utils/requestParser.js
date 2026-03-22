import DeviceDetector from "device-detector-js";
import geoip from "geoip-lite";

const detector = new DeviceDetector();

/**
 * Normalize device into fixed buckets
 */
const normalizeDevice = (type) => {
    if (!type) return "unknown";

    const t = type.toLowerCase();

    if (["smartphone", "feature phone", "phablet"].includes(t)) {
        return "mobile";
    }

    if (t === "tablet") return "tablet";
    if (t === "desktop") return "desktop";

    return "unknown";
};

/**
 * Extract real client IP (works behind proxies)
 */
const getClientIP = (req) => {
    const forwarded = req.headers["x-forwarded-for"];

    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    return (
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        ""
    );
};

/**
 * Check if IP is local/private
 */
const isLocalIP = (ip) => {
    if (!ip) return true;

    return (
        ip === "127.0.0.1" ||
        ip === "::1" ||
        ip.startsWith("192.168.") ||
        ip.startsWith("10.") ||
        ip.startsWith("172.")
    );
};

/**
 * Main parser
 */
const getRequestInfo = (req) => {
    const userAgent = req.headers["user-agent"] || "";

    // Device detection
    const result = detector.parse(userAgent);
    const rawType = result?.device?.type;
    const device = normalizeDevice(rawType);

    // IP detection
    const ip = getClientIP(req);

    // Country detection
    let country = "unknown";

    if (!isLocalIP(ip)) {
        const geo = geoip.lookup(ip);
        country = geo?.country?.toUpperCase() || "unknown";
    } else {
        country = "local"; // useful for dev/testing
    }

    return {
        device,   // mobile | desktop | tablet | unknown
        country   // IN | US | unknown | local
    };
};

export default getRequestInfo;