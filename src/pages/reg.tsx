import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { textStylesReg } from '../style/textStyles';

export default function RegPage() {
    const {
        loginUser,
        registerUser,
        loginEmployee,
        sendCode,
        isLoading,
        error: apiError,
        clearError
    } = useUser();
    const navigate = useNavigate();

    const [mode, setMode] = useState<'login' | 'register' | 'employee'>('login');
    const [phone, setPhone] = useState('+7 ');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [codeSent, setCodeSent] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [localError, setLocalError] = useState('');
    const [receivedCode, setReceivedCode] = useState('');

    useEffect(() => {
        if (apiError) {
            setLocalError(apiError);
        }
    }, [apiError]);

    const clearAllErrors = () => {
        setPhoneError('');
        setCodeError('');
        setNameError('');
        setSurnameError('');
        setLocalError('');
        clearError();
    };

    type JumpPositions = {
        forward: Record<4 | 9 | 13 | 16, number>;
        backward: Record<6 | 11 | 15 | 18, number>;
    };

    const jumpMap: JumpPositions = {
        forward: { 4: 6, 9: 11, 13: 15, 16: 18 },
        backward: { 6: 4, 11: 9, 15: 13, 18: 16 }
    };

    const formatPhoneNumber = (digits: string): string => {
        let formatted = '+7 ';
        if (digits.length > 0) {
            formatted += `(${digits.substring(0, 3)}`;
            if (digits.length > 3) {
                formatted += `) ${digits.substring(3, 6)}`;
                if (digits.length > 6) {
                    formatted += `-${digits.substring(6, 8)}`;
                    if (digits.length > 8) {
                        formatted += `-${digits.substring(8, 10)}`;
                    }
                }
            }
        }
        return formatted;
    };

    const calculateCursorPosition = (
        cursorPos: number,
        direction: 'forward' | 'backward' | 'none',
        newValue: string
    ): number => {
        if (direction !== 'none') {
            const directionMap = jumpMap[direction];
            const key = cursorPos as keyof typeof directionMap;

            if (key in directionMap) {
                return directionMap[key];
            }
        }
        return Math.max(3, Math.min(cursorPos, newValue.length));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearAllErrors();
        const input = e.target.value;
        const cursorPosition = e.target.selectionStart || 0;
        const isBackspace = input.length < phone.length;

        if (input.length < 3 || !input.startsWith('+7 ')) {
            setPhone('+7 ');
            setTimeout(() => e.target.setSelectionRange(3, 3), 0);
            return;
        }

        const cleaned = input.slice(3).replace(/\D/g, '');
        const formatted = formatPhoneNumber(cleaned);
        setPhone(formatted);

        const direction = isBackspace ? 'backward' :
            input.length > phone.length ? 'forward' : 'none';

        const newCursorPosition = calculateCursorPosition(
            cursorPosition,
            direction,
            formatted
        );

        if (e.target.selectionStart !== newCursorPosition) {
            setTimeout(() => {
                e.target.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 0);
        }
    };

    const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Backspace' || e.key === 'Delete') &&
            (e.currentTarget.selectionStart || 0) <= 3) {
            e.preventDefault();
        }

        if (e.key.length === 1 && !/\d/.test(e.key) &&
            (e.currentTarget.selectionStart || 0) >= 3) {
            e.preventDefault();
        }
    };

    const validatePhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        if (!cleaned) {
            setPhoneError('Введите номер телефона');
            return false;
        }
        if (cleaned.length < 10) {
            setPhoneError('Номер должен содержать 10 цифр');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const validateCode = (code: string) => {
        if (!code) {
            setCodeError('Введите код подтверждения');
            return false;
        }
        if (!/^\d{6}$/.test(code)) {
            setCodeError('Код должен содержать 6 цифр');
            return false;
        }
        setCodeError('');
        return true;
    };

    const validateName = (name: string) => {
        if (!name.trim()) {
            setNameError('Введите имя');
            return false;
        }
        setNameError('');
        return true;
    };

    const validateSurname = (surname: string) => {
        if (!surname.trim()) {
            setSurnameError('Введите фамилию');
            return false;
        }
        setSurnameError('');
        return true;
    };

    const handleSendCode = async () => {
        clearAllErrors();
        const cleanedPhone = phone.slice(3).replace(/\D/g, '');
        if (!validatePhone(cleanedPhone)) return;

        try {
            const phoneToSend = '7' + cleanedPhone;
            const response = await sendCode(phoneToSend);

            if (response && response.code) {
                setReceivedCode(response.code.toString());
            } else {
                setReceivedCode("Код отправлен! Проверьте консоль разработчика");
            }

            setCodeSent(true);
        } catch (err) {
            console.error('Ошибка при отправке кода:', err);
            setLocalError('Ошибка при отправке кода');
        }
    };

    const handleLogin = async () => {
        clearAllErrors();
        if (!validateCode(code)) return;

        try {
            const cleanedPhone = phone.slice(3).replace(/\D/g, '');
            const phoneToSend = '7' + cleanedPhone;
            await loginUser(phoneToSend, code);
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    const handleRegister = async () => {
        clearAllErrors();
        if (!validateCode(code) || !validateName(name) || !validateSurname(surname)) return;

        try {
            const cleanedPhone = phone.slice(3).replace(/\D/g, '');
            const phoneToSend = '7' + cleanedPhone;
            await registerUser(phoneToSend, code, name.trim(), surname.trim());
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    const handleEmployeeLogin = async () => {
        clearAllErrors();
        if (!login || !password) return;

        try {
            await loginEmployee(login, password);
            navigate('/employee/orders');
        } catch (err) {
            console.error(err);
        }
    };

    const switchMode = (newMode: 'login' | 'register' | 'employee') => {
        clearAllErrors();
        setPhone('+7 ');
        setCode('');
        setName('');
        setSurname('');
        setCodeSent(false);
        setReceivedCode('');
        setMode(newMode);

        if (newMode === 'employee') {
            setLogin('');
            setPassword('');
        }
    };

    return (
        <div className={textStylesReg.pageContainer}>
            <div className={textStylesReg.formContainer}>
                <h1 className={textStylesReg.title}>
                    {mode === 'employee' ? 'Вход для сотрудников' :
                        mode === 'register' ? 'Регистрация' : 'Вход в систему'}
                </h1>

                {(localError || phoneError || codeError || nameError || surnameError) && (
                    <div className={textStylesReg.errorContainer}>
                        {localError || phoneError || codeError || nameError || surnameError}
                    </div>
                )}

                {mode === 'employee' ? (
                    <div className="space-y-4">
                        <div>
                            <label className={textStylesReg.inputLabel}>Логин</label>
                            <input
                                type="text"
                                className={textStylesReg.inputField}
                                value={login}
                                onChange={(e) => {
                                    clearAllErrors();
                                    setLogin(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label className={textStylesReg.inputLabel}>Пароль</label>
                            <input
                                type="password"
                                className={textStylesReg.inputField}
                                value={password}
                                onChange={(e) => {
                                    clearAllErrors();
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            onClick={handleEmployeeLogin}
                            disabled={isLoading}
                            className={textStylesReg.primaryButton}
                        >
                            {isLoading ? 'Вход...' : 'Войти как сотрудник'}
                        </button>
                    </div>
                ) : codeSent ? (
                    <div className="space-y-4">
                        <p className={textStylesReg.codeSentMessage}>
                            Код отправлен на номер {phone}
                        </p>

                        {receivedCode && (
                            <div className="p-3 bg-yellow-100 rounded text-center text-lg font-medium mb-4">
                                {receivedCode.match(/^\d+$/) ? (
                                    <>
                                        Ваш код подтверждения: <strong>{receivedCode}</strong>
                                    </>
                                ) : (
                                    receivedCode
                                )}
                            </div>
                        )}

                        <div>
                            <label className={textStylesReg.inputLabel}>Код подтверждения</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                className={`${textStylesReg.inputField} ${codeError ? textStylesReg.inputError : ''}`}
                                value={code}
                                onChange={(e) => {
                                    clearAllErrors();
                                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                                    validateCode(e.target.value);
                                }}
                                placeholder="Введите 6 цифр"
                                maxLength={6}
                            />
                        </div>

                        {mode === 'register' && (
                            <>
                                <div>
                                    <label className={textStylesReg.inputLabel}>Имя</label>
                                    <input
                                        type="text"
                                        className={`${textStylesReg.inputField} ${nameError ? textStylesReg.inputError : ''}`}
                                        value={name}
                                        onChange={(e) => {
                                            clearAllErrors();
                                            setName(e.target.value);
                                            validateName(e.target.value);
                                        }}
                                        placeholder="Введите ваше имя"
                                    />
                                </div>
                                <div>
                                    <label className={textStylesReg.inputLabel}>Фамилия</label>
                                    <input
                                        type="text"
                                        className={`${textStylesReg.inputField} ${surnameError ? textStylesReg.inputError : ''}`}
                                        value={surname}
                                        onChange={(e) => {
                                            clearAllErrors();
                                            setSurname(e.target.value);
                                            validateSurname(e.target.value);
                                        }}
                                        placeholder="Введите вашу фамилию"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            onClick={mode === 'register' ? handleRegister : handleLogin}
                            disabled={isLoading}
                            className={textStylesReg.primaryButton}
                        >
                            {isLoading ? 'Проверка...' : mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
                        </button>

                        <button
                            onClick={() => {
                                clearAllErrors();
                                setCode('');
                                setCodeSent(false);
                                setReceivedCode('');
                            }}
                            className={textStylesReg.secondaryButton}
                        >
                            Изменить номер телефона
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className={textStylesReg.inputLabel}>Номер телефона</label>
                            <input
                                type="tel"
                                className={`${textStylesReg.inputField} ${phoneError ? textStylesReg.inputError : ''}`}
                                value={phone}
                                onChange={handlePhoneChange}
                                onKeyDown={handlePhoneKeyDown}
                                placeholder="+7 (___) ___-__-__"
                                maxLength={18}
                            />
                        </div>
                        <button
                            onClick={handleSendCode}
                            disabled={isLoading || phone.length < 18}
                            className={textStylesReg.primaryButton}
                        >
                            {isLoading ? 'Отправка...' : 'Получить код'}
                        </button>
                    </div>
                )}

                <div className={textStylesReg.modeSwitchContainer}>
                    <button
                        onClick={() => switchMode('login')}
                        className={textStylesReg.modeButton(mode === 'login')}
                    >
                        Вход
                    </button>
                    <button
                        onClick={() => switchMode('register')}
                        className={textStylesReg.modeButton(mode === 'register')}
                    >
                        Регистрация
                    </button>
                    <button
                        onClick={() => switchMode('employee')}
                        className={textStylesReg.modeButton(mode === 'employee')}
                    >
                        Сотрудник
                    </button>
                </div>
            </div>
        </div>
    );
}