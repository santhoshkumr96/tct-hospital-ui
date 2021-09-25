import { Button, Fab } from "@mui/material";
import './CreateCampain.scss'
import { useState } from 'react';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const CreateCampain = ({ onCancelCampain }) => {

    const items = [
        { number: "1", title: "Section 1" },
        { number: "2", title: "Section 2" },
        { number: "3", title: "Section 3" },
        { number: "4", title: "Section 4" },
        { number: "5", title: "Section 5" },
    ]

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    const initialDnDState = {
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
        originalOrder: [],
        updatedOrder: []
    }

    const invoke = (fn) => { setTimeout(fn, 0) } 

    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
    const [list, setList] = useState(items);
    const [dragging, setDragging] = useState(false)

    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list
        })
        event.dataTransfer.setData("text/html", '');
        console.log('on drag start')
    }

    const onDragOver = (event) => {
        event.preventDefault();

        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom;
        const draggedTo = Number(event.currentTarget.dataset.position);

        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);

        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];

        console.log('on drag over')

        if (draggedTo !== dragAndDrop.draggedTo) {
            // setList([...newList]);
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo
            })
        }
    }

    const onDrop = () => {
        console.log('on drag drop')
        setList([...dragAndDrop.updatedOrder]);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    }

    const onDragLeave = () => {
        console.log('on drag leave')
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });

    }

    const onCampainCancel = () => {
        onCancelCampain();
    }

    const onAddSection = () => {
        console.log('seomthing');
    }

    return (
        <div>



            <section id="campain-details-enter">
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Campaign Name"
                    // value={createQuestionStore.questionDesc.toString()}
                    variant="outlined"
                // onChange={(e) => { onNewQuestionDataEntryChange(e.target.value, QUESTION_DESC) }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Campaign Desc"
                    // value={createQuestionStore.questionDesc.toString()}
                    variant="outlined"
                // onChange={(e) => { onNewQuestionDataEntryChange(e.target.value, QUESTION_DESC) }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Objective"
                    // value={createQuestionStore.questionDesc.toString()}
                    variant="outlined"
                // onChange={(e) => { onNewQuestionDataEntryChange(e.target.value, QUESTION_DESC) }}
                />
            </section>

            <section id='campaign-create-add-section'>
                <Button style={{ marginLeft: '20px' }} variant="contained" onClick={() => { onAddSection() }}>
                    create campaign
                </Button>
                <Button onClick={() => { onCampainCancel() }}>
                    cancel
                </Button>

            </section>

            {/* <section id='create-campain-drag-drop'>
                <ul id='create-campain-drag-drop-ul'>
                    {list.map((item, index) => {
                        return (
                            <li key={index}
                                draggable="true"
                                onDragStart={onDragStart}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                onDragLeave={onDragLeave}
                                data-position={index}

                                className={dragAndDrop && dragAndDrop.draggedTo === Number(index) ? "dropArea" : ""}
                            >
                                <p>section</p>
                                <p>section</p>
                                <p>section</p>
                                 <div id='draggable-portion'>
                                    <DragHandleIcon />
                                </div>
                                <div id='section-content'>
                                <TextField placeholder='section name' id="standard-basic" variant="standard" />
                                    <p>{item.title}</p>
                                    <p>{item.title}</p>
                                </div> 
                            </li>

                        )
                    })}
                </ul>
            </section> */}


            <section>
                <ul>

                    {list.map((item, index) => {
                        return (
                            <li
                                key={index}

                                data-position={index}
                                draggable
                                onDragStart={onDragStart}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                onDragLeave={onDragLeave}

                                className={dragAndDrop && dragAndDrop.draggedTo === Number(index) ? "dropArea" : ""}
                            >
                                <div id='draggable-portion'>
                                    <DragIndicatorIcon />
                                </div>

                                <div >
                                    <span>  </span>
                                    <table>
                                        <tr>
                                            <th>
                                                Question ID
                                            </th>
                                            <th>
                                                Question Name
                                            </th>
                                            <th>
                                                Question Desc
                                            </th>
                                            <th>
                                                Response Type
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>Alfreds Futterkiste</td>
                                            <td>Maria Anders</td>
                                            <td>Germany</td>
                                            <td>Germany</td>
                                        </tr>
                                    </table>

                                    <Button>
                                        add question
                                    </Button>
                                    <Button>
                                        delete Section
                                    </Button>
                                </div>
                            </li>
                        )
                    })}

                </ul>
            </section>



        </div>
    )
}

export default CreateCampain;