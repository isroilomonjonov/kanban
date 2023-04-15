import React, { Fragment, useContext, useEffect, useState } from "react";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import AppContext from "../context/AppContext";
import ModalCreateColumn from "./Modals/ModalCreateColumn";
import ThreeDots from "../icons/ThreeDots";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import ExampleModal from "./Modals/ModalCreateBoard";

function UncontrolledBoard({ id, href, modal }) {
  const ctx = useContext(AppContext);
  const [columns, setColumns] = useState({
    columns: ctx.columns.filter((i) => i.boardId === id),
  });
  useEffect(() => {
    setColumns({ columns: ctx.columns.filter((i) => i.boardId === id) });
  }, [id, ctx, modal]);
  const fn = (data) => {
    ctx.setColumns(data.columns);
  };
  return (
    <Board
      key={href + id + columns.length}
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      onLaneRemove={() => {}}
      onCardRemove={() => {}}
      onLaneRename={() => {}}
      initialBoard={columns}
      allowAddCard={{ on: "top" }}
      onNewCardConfirm={(draftCard) => ({
        id: new Date().getTime(),
        ...draftCard,
      })}
      onCardNew={fn}
    />
  );
}

function CanbanBoard({ id, href }) {
  const [data, setData] = useState(id);
  const [modal, setModal] = useState(false);
  const [modalBoard, setModalBoard] = useState(false);
  const ctx = useContext(AppContext);
  const user = {
    name: "Admin",
    email: "admin@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  useEffect(() => {
    setData(id);
  }, [id]);
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">
            Board{data}!
          </h1>

          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white ">
                <ThreeDots />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <button
                    style={{ padding: "10px" }}
                    onClick={() => ctx.removeBoard(data)}
                  >
                    Delete Board
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    style={{ padding: "10px" }}
                    onClick={() => {
                      setModalBoard(true);
                    }}
                  >
                    Update Board
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div style={{ display: "flex" }}>
        {data && !modal && (
          <UncontrolledBoard key={data} id={data} href={href} modal={modal} />
        )}
        {modal && <ModalCreateColumn close={() => setModal(false)} id={data} />}
        {modalBoard && ctx.boards.length >= 1 && (
          <ExampleModal close={() => setModalBoard(false)} id={data} />
        )}
        {!modal && ctx.boards.length >= 1 && (
          <button
            onClick={() => setModal(true)}
            className="bg-slate-300 hover:bg-slate-400 w-100 h-96 text-white p-10 m-2.5 rounded"
          >
            <h1 className="text-3xl tracking-tight text-center">
              Create Column
            </h1>
          </button>
        )}
      </div>
    </>
  );
}

export default CanbanBoard;
