import React, { useRef, useState, useEffect } from "react";

const list = [
  { id: 0, name: "1번" },
  { id: 1, name: "2번" },
  { id: 2, name: "3번" },
  { id: 3, name: "4번" },
];
const Test = () => {
  const [dragAndDrop, setDragAndDrop] = useState({
    draggedFrom: null, //드래그 시작인덱스
    draggedTo: null, //드래그 변경될 인덱스
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  });

  const onDragStart = (e) => {
    e.currentTarget.style.opacity = "0.4";
    const initialPosition = parseInt(e.currentTarget.dataset.position); //초기 인덱스

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition, //초기인덱스
      originalOrder: list, //오리지날 리스트
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder; //오리지날리스트
    const draggedFrom = dragAndDrop.draggedFrom; //드래그 시작때 찍은 값
    const draggedTo = parseInt(e.currentTarget.dataset.position); // 부딪히는타겟 인덱스
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom); //클릭한 인덱스랑 복사한 오리지날배열속 인덱스 다른것 반환

    newList = [
      // 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      // ...remainingItems.slice(draggedTo),
    ];

    // console.log(draggedFrom, "첫지점");
    // console.log(draggedTo, "도착지점");
    console.log(newList, "배열");
    // console.log(itemDragged, "배열찍은거");
    // console.log(remainingItems);
  };

  useEffect(() => {
    console.log(dragAndDrop);
  }, [dragAndDrop]);

  return (
    <>
      <div>
        <ul>
          {list.map((c, index) => {
            return (
              <li key={c.id} draggable onDragStart={onDragStart} data-position={index} onDragOver={onDragOver}>
                {c.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Test;
