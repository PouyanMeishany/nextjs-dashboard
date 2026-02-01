import postgres from 'postgres';

declare global {
    var sql: ReturnType<typeof postgres> | undefined;
    var sql2: ReturnType<typeof postgres> | undefined;
}

let sql: ReturnType<typeof postgres>;
let sql2: ReturnType<typeof postgres>;

const connectionConfig = {
    ssl: 'require' as const,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    max_lifetime: 60 * 30,
};

if (process.env.NODE_ENV === 'production') {
    sql2 = postgres(process.env.POSTGRES_URL2!, connectionConfig);
    sql = postgres(process.env.POSTGRES_URL!, connectionConfig);
} else {
    if (!global.sql) {
        global.sql = postgres(process.env.POSTGRES_URL!, connectionConfig);
    }
    if (!global.sql2) {
        global.sql2 = postgres(process.env.POSTGRES_URL2!, connectionConfig);
    }
    sql = global.sql;
    sql2 = global.sql2;
}

export { sql, sql2 };