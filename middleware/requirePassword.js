import bcrypt from 'bcryptjs';
import 'dotenv/config';

const requirePassword = async (req, res, next) => {
  const enteredPassword = req.body.password;
  const { path, baseUrl } = req;
  const noPWMsg = 'Please enter password';
  const wrongPWMsg = 'Password incorrect';
  const errMsg = 'Please retry';

  if (!enteredPassword) {
    if (path.includes('update'))
      return res.redirect(baseUrl + path + '?error=' + noPWMsg);
    if (path.includes('delete')) return res.redirect('/' + '?error=' + noPWMsg);
  }

  const isMatch = await bcrypt.compare(
    enteredPassword,
    process.env.HASHED_PASSWORD
  );

  try {
    if (isMatch) {
      next();
    } else {
      if (path.includes('update'))
        return res.redirect(baseUrl + path + '?error=' + wrongPWMsg);
      if (path.includes('delete'))
        return res.redirect('/' + '?error=' + wrongPWMsg);
    }
  } catch {
    if (path.includes('update'))
      return res.redirect(baseUrl + path + '?error=' + errMsg);
    if (path.includes('delete')) return res.redirect('/' + '?error=' + errMsg);
  }
};

export default requirePassword;
