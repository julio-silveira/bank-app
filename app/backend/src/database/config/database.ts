import 'dotenv/config'
import { Options } from 'sequelize'

const config: Options = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'NG.CASH_DB',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true
  }
}

export = config
