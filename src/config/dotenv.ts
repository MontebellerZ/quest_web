export const getDotenv = (name: string) => {
    const VAR_ENV: string | null = import.meta.env[name];
    if (!VAR_ENV) throw `${name} not found in .env`;
    return VAR_ENV;
};
