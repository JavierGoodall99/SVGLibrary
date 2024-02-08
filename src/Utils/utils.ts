type IconConfig = {
    [key: string]: IconStyle;
};

export type IconStyle = {
    gradientStart?: string;
    gradientEnd?: string;
    hasGradient?: boolean;
    strokeWidth?: number;
    size?: number;
    gradientAngle?: 0,
};

export const theme: IconConfig = {
    Woonmatch: {
        gradientStart: "#704c10",
        gradientEnd: "#eac383",
        hasGradient: false,
        strokeWidth: 5,
        size: 48,
        gradientAngle: 0,
    },
    DataBalk: {
        gradientStart: "#08305e",
        gradientEnd: "#ee0303",
        hasGradient: true,
        strokeWidth: 10,
        size: 48,
        gradientAngle: 0,
    },
    KnusWonen: {
        gradientStart: "#0e7847",
        gradientEnd: "#0369ee",
        hasGradient: false,
        strokeWidth: 8,
        size: 48,
        gradientAngle: 0,
    }
}
