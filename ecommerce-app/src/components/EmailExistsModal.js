import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowEmailExistsModal, selectEmailCheckError, closeEmailExistsModal } from '../store/authSlice';

const EmailExistsModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowEmailExistsModal);
  const error = useSelector(selectEmailCheckError);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Email Already Exists</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => dispatch(closeEmailExistsModal(false))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailExistsModal;