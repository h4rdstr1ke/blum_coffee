import React, { useState } from 'react';

type Props = {}

export default function RegPage({ }: Props) {
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    return (
        <div className="max-w-[] m-auto ">
            <div className="flex flex-col items-center justify-center ">
                <h1 className='text-[75px] text-[#39C6FF] mb-[30px]'>Вход в личный кабинет</h1>
                <div className={`border border-black rounded-[30px] ${showCodeInput ? 'w-[1000px]' : 'w-[700px]'} h-[400px] p-[30px] flex flex-col items-center justify-center `}>
                    <div className="flex flex-col items-center">
                        {!showCodeInput && (
                            <p className="text-[32px] text-[#C9CCCD] ">Введите номер телефона</p>
                        )}
                        <input
                            className="bg-[#A5A5A5] rounded-[20px] p-[20px] mt-[16px] text-[30px] text-[#FFFFFF] font-bold"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button className="text-[32px] text-[#C9CCCD] hover:cursor-pointer">Изменить</button>
                    </div>

                    {showCodeInput && (
                        <div className="mt-[18px] flex flex-col items-center">
                            <p className="text-[32px] text-[#39C6FF] mb-[15px] font-semibold">Отправили код на номер, введите его ниже </p>
                            <input
                                className="bg-[#A5A5A5] rounded-[20px] p-[20px] text-[30px] text-[#FFFFFF] font-bold"
                                type="text"
                                placeholder="Введите код"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    )}

                    {!showCodeInput && (
                        <button
                            onClick={() => setShowCodeInput(true)}
                            className="text-[38px] mt-[30px] bg-[#39C6FF] text-[#FFFFFF] rounded-[20px] px-[40px] pb-[7px] hover:cursor-pointer"
                        >
                            Продолжить
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}