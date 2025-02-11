import React, { useContext, useState } from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout"
import { UserContext } from '../../context/UserProvider'
import useUserAuth from '../../hooks/useUserAuth'
import { POLL_TYPE } from '../../utils/data'
import OptionInput from '../../components/input/OptionInput'
import OptionImageSelector from '../../components/input/OptionImageSelector'

const CreatePoll = () => {

  useUserAuth();

  const { user } = useContext(UserContext);
  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],

    error: "",
  });
  const valueHandleChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //Create a new poll
  const handleCreatePoll = () => {
    const { question, type, options, error } = pollData;
    if (!question || !type) {
      console.log("CREATE:", { question, type, options, error });
      valueHandleChange("error", "Question & type are required ");
      return;
    }

    if (type === "single-choice" && options.length < 2) {
      valueHandleChange("error", "Enter at least 2 options");
      return;
    }
    if (type === "image-based" && imagegeOptions.length < 2) {
      valueHandleChange("error", "Enter at least 2 options");
      return;
    }
    valueHandleChange("error", "");
    console.log("NO_ERR", { pollData })

  }


  return (
    <DashboardLayout activeMenu="Create Poll">
      <div className='bg-gray-100/80 my-5 p-5 rounded-lg mx-auto '>
        <h2 className='text-lg text-black font-medium'>Create Poll</h2>
      </div>

      <div className='mt-3'>
        <label className='text-xs font-medium text-slate-500'>QUESTION</label>
        <textarea
          placeholder='What is in your mind'
          className='w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2'
          rows={4}
          value={pollData.question}
          onChange={({ target }) => valueHandleChange("question", target.value)}
        />
      </div>

      <div className='mt-3'>
        <label className='text-xs font-medium text-slate-600'>POLL TYPE</label>

        <div className='flex gap-4 flex-wrap mt-3'>
          {POLL_TYPE.map((item, key) => (
            <div
              key={item.value}
              className={`option-chip ${pollData.type === item.value ? "text-white bg-blue-600 border-blue-600" : "border-b-sky-100"}`}
              onClick={() => valueHandleChange("type", item.value)}
            >{item.label}
            </div>
          ))}
        </div>

        {pollData.type === "single-choice" && (
          <div className='mt-5'>
            <label className='text-xs font-medium text-slate-600'>OPTIONS</label>

            <div className='mt-3'>
              <OptionInput
                optionList={pollData.options}
                setOptionList={(value) => { valueHandleChange("options", value) }}
              />

            </div>
          </div>
        )}

        {pollData.type === "image-based" && (
          <div className='mt-5'>
            <label className='text-xs font-medium text-slate-600'>
              IMAGE OPTIONS
            </label>
            <div className='mt-3'>
              <OptionImageSelector imageList={pollData.imageOptions} setImageList={(value) => valueHandleChange("imageOptions", value)} />
            </div>
          </div>
        )}


        {pollData.error && (
          <p className='text-xs font-medium text-red-500 mt-5'>
            {pollData.error}
          </p>
        )}
        <button className='btn-primary py-2 mt-6' onClick={handleCreatePoll}>CREATE</button>
      </div>

    </DashboardLayout>
  )
}

export default CreatePoll