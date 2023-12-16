import React from "react";

function DeleteModal({
  title,
  caption,
  icon,
  buttonText,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="absolute z-20 backdrop-blur-md bg-transparent h-screen right-0 left-0 top-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-error sm:mx-0 sm:h-10 sm:w-10">
              <i className={`fa-regular ${icon} bg-transparent text-white`}></i>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                className="text-xxs font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-xxs text-gray-500">{caption}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-error px-3 py-2 text-xxs font-semibold text-white shadow-sm  border-error border hover:bg-transparent hover:text-primary hover:border hover:border-primary sm:ml-3 sm:w-auto"
              onClick={onConfirm}
            >
              {buttonText}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-xxs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
