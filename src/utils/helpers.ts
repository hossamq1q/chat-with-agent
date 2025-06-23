import * as FormData from 'form-data';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { databaseConfig, queryPayload, ResponseBuildIndex } from "./types";

export async function buildIndex(
  files: Express.Multer.File[],
  urls: string[],
  database_config:databaseConfig
): Promise<ResponseBuildIndex> {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file.buffer, file.originalname);
    });
    if(urls){
      urls.forEach((url) => {
        formData.append('urls', url);
      });
    }
    if (database_config) {
      formData.append('host', database_config.host);
      formData.append('port', database_config.port);
      formData.append('user', database_config.user);
      formData.append('password', database_config.password);
      formData.append('database', database_config.database);
      formData.append('mysql_query', database_config.mysql_query);
    }
    const response = await axios.post(
      'http://127.0.0.1:8000/build-index',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to call build-index: ${error.message}`);
  }
}

export async function queryIndex(payload: queryPayload): Promise<any> {
  try {
    const response = await axios.post('http://127.0.0.1:8000/query', {
      index_id: payload.indexId,
      query: payload.query,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to call query endpoint: ${error.message}`);
  }
}

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export async function compareHash(rawPassword: string, hashPassword: string) {
  return await bcrypt.compare(rawPassword, hashPassword);
}
