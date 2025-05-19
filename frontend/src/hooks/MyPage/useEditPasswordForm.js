import { useState, useEffect } from "react";
import { isValidPassword } from "../../utils/validation";

const useEditPasswordForm = (userCurrentPassword) => {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [currentPwdError, setCurrentPwdError] = useState("");
  const [newPwdError, setNewPwdError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");

  const [touchedCurrent, setTouchedCurrent] = useState(false);
  const [touchedNew, setTouchedNew] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  useEffect(() => {
    if (!touchedCurrent) return;

    if (!currentPwd) {
      setCurrentPwdError("현재 비밀번호를 입력해주세요.");
    } else if (currentPwd !== userCurrentPassword) {
      setCurrentPwdError("현재 비밀번호가 올바르지 않습니다.");
    } else {
      setCurrentPwdError("");
    }
  }, [currentPwd, touchedCurrent, userCurrentPassword]);

  useEffect(() => {
    if (!touchedNew) return;

    if (!newPwd) {
      setNewPwdError("새로운 비밀번호를 입력해주세요.");
    } else {
      const pwdFormatError = isValidPassword(newPwd);
      if (pwdFormatError) {
        setNewPwdError(pwdFormatError);
      } else {
        setNewPwdError("");
      }
    }
  }, [newPwd, touchedNew]);

  useEffect(() => {
    if (!touchedConfirm) return;

    if (confirmPwd && newPwd !== confirmPwd) {
      setConfirmPwdError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPwdError("");
    }
  }, [newPwd, confirmPwd, touchedConfirm]);

  const validate = () => {
    let valid = true;

    if (!currentPwd) {
      setCurrentPwdError("현재 비밀번호를 입력해주세요.");
      valid = false;
    } else if (currentPwd !== userCurrentPassword) {
      setCurrentPwdError("현재 비밀번호가 올바르지 않습니다.");
      valid = false;
    }

    if (!newPwd) {
      setNewPwdError("새로운 비밀번호를 입력해주세요.");
      valid = false;
    } else {
      const pwdFormatError = isValidPassword(newPwd);
      if (pwdFormatError) {
        setNewPwdError(pwdFormatError);
        valid = false;
      }
    }

    if (newPwd !== confirmPwd) {
      setConfirmPwdError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    return valid;
  };

  return {
    currentPwd,
    newPwd,
    confirmPwd,
    currentPwdError,
    newPwdError,
    confirmPwdError,
    setCurrentPwd: (val) => {
      setTouchedCurrent(true);
      setCurrentPwd(val);
    },
    setNewPwd: (val) => {
      setTouchedNew(true);
      setNewPwd(val);
    },
    setConfirmPwd: (val) => {
      setTouchedConfirm(true);
      setConfirmPwd(val);
    },
    validate,
  };
};

export default useEditPasswordForm;
