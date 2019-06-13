const { Pool } = require('pg');
const pool = new Pool({
  user: 'michal',
  host: 'localhost',
  database: 'db_project',
  password: 'Mkinas888',
  port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};
  