import { getENVValue } from './src/utils/utils';
import app from './src/app';

const port = getENVValue('PORT');

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});