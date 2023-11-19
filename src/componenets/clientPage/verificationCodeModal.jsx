import React, { useState } from 'react';
import { sendPostRequest } from '../../services/data';

function VerificationCodeModal({ id, open, setOpen }) {
  const [code, setCode] = useState();
  const [error, setError] = useState('');

  const save = async (e) => {
    e.preventDefault();
    try {
      setError('')
      const res = await sendPostRequest('/clients/verificationOperationCode', { code, id });
      window.location.reload();
    } catch (error) {
      if (error.response.status == 404 || error.response.status == 400) {
        setError('code sended error');
      }
    }
  }
  return (
    <>
      <div id="defaultModal" className={(open ? 'flex justify-center items-center z-[500] ' : 'hidden') + " fixed top-0 left-0 right-0  h-full  w-full  p-4 overflow-x-hidden overflow-y-auto md:inset-0 "}>
        <div className="relative w-full max-w-2xl ">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-2 border-b rounded-t bg-blue-700">
              <span className='text-white capitalize'>
                verification of your account
              </span>
              <button onClick={() => setOpen(false)} type="button" className="text-gray-400 hover:text-white bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center ">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <div style={{ maxHeight: 'calc(100vh - 100px)' }} className='flex flex-col  overflow-auto '>

              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="code"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your code sened in your email
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      onChange={(e) => setCode(e.target.value)}

                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="XXXX"
                      required
                    />
                  </div>
                  {error.length ? (
                    <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
                      {error}
                    </div>
                  ): (null)}

                  <button
                    onClick={(e) => save(e)}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Verification
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>
      {open ? (
        <div className="fixed top-0 left-0 bg-gray-700 opacity-70 h-full w-full z-[499]">
        </div>
      ) : null}


    </>
  );
}

export default VerificationCodeModal;
