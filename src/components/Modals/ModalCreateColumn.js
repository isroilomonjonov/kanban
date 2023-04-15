import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFieldArray, useForm } from "react-hook-form";
import AppContext from "../../context/AppContext";
import {XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalCreateColumn({ close,id }) {
  const cancelButtonRef = useRef(null);
  const ctx = useContext(AppContext);

  const fn = (data) => {

    ctx.setColumns(data.columns)
    close();
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "columns"
    }
  );
  useEffect(()=>{
    reset({name:ctx.boards.filter((i)=>i.id===id)[0].name,columns:ctx.columns.filter((i)=>i.boardId===id)})
  },[])
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={close}
      >
  
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form className="p-10" onSubmit={handleSubmit(fn)}>
                  <div className="space-y-12">
                    <div className="block border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Board Information
                      </h2>

                      <div className="mt-10">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              disabled
                              {...register("name")}
                              placeholder="Board Name: My Plan"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        {fields.map((field, index) => (
                          <div className="block sm:col-span-3 m-2" key={field.id}>
                            <label
                              htmlFor={`columns.${index}.title`}
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Column {index + 1}
                            </label>
                            <div className="mt-2 flex">
                              <input
                                type="text"
                                name={`columns.${index}.title`}
                                id={`columns.${index}.title`}
                                {...register(`columns.${index}.title`)}
                                placeholder="Column Name"
                                autoComplete="given-name"
                                className=" w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          onClick={() => {
                            append({ id: Date.now().toString(),title:'Column Name',boardId:id,cards:[] });
                          }}
                        >
                          Add Column
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={close}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
