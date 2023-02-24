import React, { useRef, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Test = () => {
  const [list, setList] = useState([
    { id: 0, name: "1번" },
    { id: 1, name: "2번" },
    { id: 2, name: "3번" },
    { id: 3, name: "4번" },
  ]);
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
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      // 놓을 수 있는 영역이 변경 되면 객체를 변경해줌
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };
  const onDrop = (e) => {
    setList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
    });
  };
  const onDragEnter = (e) => {
    //잡은 Item이 다른 Item이랑 겹쳤을 때 발생
    e.currentTarget.classList.add("over");
  };
  const onDragLeave = (e) => {
    //영역밖나간 드래그 엘리먼트
    e.currentTarget.classList.remove("over");
  };
  const onDragEnd = (e) => {
    console.log(e.currentTarget);
    e.currentTarget.style.opacity = "1";
    const listItens = document.querySelectorAll(".draggable");
    listItens.forEach((item) => {
      item.classList.remove("over");
    });
  };

  const [todos, setTodo] = useState([
    { id: "0", title: "0공부" },
    { id: "1", title: "1헬스" },
    { id: "2", title: "2독서" },
    { id: "3", title: "3산책" },
    { id: "4", title: "4요리" },
  ]);
  const handleChange = (result) => {
    if (!result.destination) return;
    const items = [...todos]; // 새배열담기
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodo(items);
  };

  // function solution(a: number, b: number) {
  //   return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date(2023, a - 1, b).getDay()];
  // }
  // solution(2, 22);

  // function solution(s: string) {
  //   console.log(s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1));
  // }
  // solution("abcde");

  // function solution() {
  //   const a = [1, 1, 3, 3, 0, 1, 1];
  //   console.log(a.filter((c, i) => c !== a[i + 1]));
  // }

  // function solution(arr: any, divisor: any) {
  //   const answer = arr.filter((el: number) => el % divisor === 0);
  //   return console.log(answer.length ? answer.sort((p: number, c: number) => p - c) : [-1]);
  // }

  // solution([10, 5, 44, 45, 85], 5);

  // const solution = (num1, num2) => {
  //   const newArr = [];
  //   for (let i = 1; i <= num1; i++) {
  //     newArr.push(i);
  //   }
  //   return newArr.filter((c, i) => c % 2 == 0).reduce((a, c) => a + c);
  // };
  // solution(4);

  // const solution = (a) => {
  //   const text = a.split("").reverse().join().replace(/,/g, "");
  //   console.log(text);
  // };
  // solution("my_string");

  // const solution = (num_list) => {
  //   num_list.reduce(
  //     (acc, v) => {
  //       console.log(acc, v, "dd");
  //       acc[v % 2 === 0 ? 0 : 1] += 1;
  //       //짝수면 [0,] 홀수 [,1]  //짝2 홀3
  //       return acc;
  //     },
  //     [0, 0]
  //   );
  // };
  // solution([1, 2, 3, 4, 5]);

  // const solution = (my_string, n) => {
  //   [...my_string].map((a) => a.repeat(n)).join("");

  //   console.log([...my_string].map((c) => c.repeat(n)).join(""));
  //   console.log(
  //     my_string
  //       .split("")
  //       .map((c) => c.repeat(n))
  //       .join("")
  //   );
  // };
  // solution("hello", 3);

  // const solution = (my_string, letter) => {
  //   console.log([...my_string].filter((c) => c !== letter).join(""));
  //   console.log(my_string.replaceAll(letter, ""));
  //   console.log(my_string.split(letter));

  // };
  // solution("abcdeff", "f");

  // const solution = (numbers) => {
  //   console.log(numbers.map((c) => c * 2));
  //   console.log(numbers.reduce((a, b) => [...a, b * 2], []));
  // };
  // solution([1, 2, 3, 4, 5]);

  // const solution = (my_string) => {
  //   const arr = [];
  //   [...my_string].map((c) => {
  //     if (c === c.toUpperCase()) arr.push(c.toLowerCase());
  //     else arr.push(c.toUpperCase());
  //   });
  //   return arr.join("");
  // };

  // solution("cccCCC");
  // solution("abCdEfghIJ");

  // const solution = (n, numlist) => {
  //   numlist.filter((c, i) => {
  //     console.log(c);
  //   });
  //   console.log(numlist.filter((c, i) => c % n === 0));
  // };
  // solution(3, [4, 5, 6, 7, 8, 9, 10, 11, 12]);

  // const solution = (my_string, num1, num2) => {
  //   console.log([...my_string]);
  //   // console.log([...my_string].replace("h", "s"));
  // };
  // solution("hello", 1, 2);

  // const solution = (quiz) => {
  //   // 배열 맵 반복 > 스플릿 = 등호 삭제 한 것을 구조 분해 할당 > Eval( a 문자 연산)
  //   // a와 === b 삼항연산
  //   let res = [];
  //   quiz.map((c) => {
  //     const [a, b] = c.split("=");
  //     console.log(a, b);
  //     console.log(eval(a) === Number(b));
  //     res.push(eval(a) === Number(b) ? "O" : "X");
  //   });
  //   return res;
  // };
  // solution(["19 - 6 = 13", "5 + 66 = 71", "5 - 15 = 63", "3 - 1 = 2"]);

  // const solution = (num, k) =>  [...String(num)].includes(String(k)) ? [...String(num)].indexOf(String(k)) + 1 : -1
  // //num 속 k 있는지 확인 있다면 indexOf(k)
  // solution(29183, 1);
  // solution(232443, 4);
  // solution(123456, 7);

  //배열 중복값 제거시엔 set
  // const solution = (my_string) => {
  //   const set = new Set(my_string);
  //   return [...set].join("");
  // };
  // solution("We are the world");

  // const solution = (slice, n) => {
  //   console.log(Math.ceil(n / slice));
  // };
  // solution(7, 10);

  // const solution = (array) => {
  //   const arr = Math.max(...array);
  //   console.log([Math.max(...array), array.indexOf(arr)]);
  //   return [Math.max(array), array.indexOf(arr)];
  // };
  // solution([1, 8, 3]);

  // const solution = (my_string, num1, num2) => {
  //   const res = [...my_string];
  //   res.splice(num1, 1, my_string[num2]);
  //   res.splice(num2, 1, my_string[num1]);
  //   return res.join("");
  // };
  // solution("hello", 1, 2);

  // const solution = (n) => {
  //   let pizzaBox = 6;
  //   // 같은 수로 나눠질 때까지 +6
  //   while (pizzaBox % n !== 0) {
  //     pizzaBox += 6;
  //   }
  //   return console.log(pizzaBox / 6);
  // };
  // solution(6);
  // solution(10);

  const solution = (id_pw, db) => {
    db.map((c) => {
      // console.log(c, c[0], c[1], "분해");
      // console.log(c.includes(id_pw[0]), "아이디검사");
      // console.log(c.includes(id_pw[1]), "비번검사");
      // console.log(c.includes(id_pw[0]) && c.includes(id_pw[1]) ? "login" : c.includes(id_pw[0]) && c.includes(id_pw[1]) === false ? "wrong pw" : "fail");
      return c.includes(id_pw[0]) && c.includes(id_pw[1]) ? "login" : c.includes(id_pw[0]) && c.includes(id_pw[1]) === false ? "wrong pw" : "fail";
    });
  };
  solution(
    ["meosseugi", "1234"],
    [
      ["rardss", "123"],
      ["yyoom", "1234"],
      ["meosseugi", "1234"],
    ]
  );
  solution(
    ["programmer01", "15789"],
    [
      ["programmer02", "111111"],
      ["programmer00", "134"],
      ["programmer01", "1145"],
    ]
  );

  return (
    <>
      <div>
        <ul className="test">
          {list.map((c, index) => {
            return (
              <li
                key={c.id}
                className="draggable"
                draggable={true}
                data-position={index} //순번
                onDragStart={onDragStart} //시작 인덱스
                onDragOver={onDragOver} // 시작에서 부딫히는 인덱스 계속
                onDrop={onDrop} //놓을때 리스트 변경
                onDragEnter={onDragEnter} // 곂칠때 1번
                onDragLeave={onDragLeave}
                onDragEnd={onDragEnd}
              >
                {c.name}
              </li>
            );
          })}
        </ul>
      </div>

      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map(({ id, title }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} key={id}>
                      <p>{title}</p>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Test;
