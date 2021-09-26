import { Button, Fab } from "@mui/material";
import './CreateCampain.scss'
import { useState, useCallback } from 'react';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import QuestionSearch from '../QuestionPage/Search';

const CreateCampain = ({ onCancelCampain }) => {

    const defaultSection = [
        {
            title: "Section Name",
            questions: [
                {
                    questionId: "id",
                    questionDesc: "Desc",
                    questionName: "QuestionName",
                    responseType: "text",
                    response: [
                        {
                            responseName: "someRes",
                            responseDesc: "reponseDesc"
                        }
                    ]
                },
            ]
        }
    ]

    const initialDnDState = {
        draggedFrom: null,
        draggedTo: null,
        draggedEnteredTo: null,
        isDragging: false,
        originalOrder: [],
        updatedOrder: []
    }


    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
    const [list, setList] = useState(defaultSection);

    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list
        })
        event.dataTransfer.setData("text/html", '');

        //console.log('on drag start')
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

        //console.log('on drag over')

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
        // console.log('on drag drop')
        setList([...dragAndDrop.updatedOrder]);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedEnteredTo: null,
            draggedTo: null,
            isDragging: false
        });
    }

    const onDragLeave = () => {
        // console.log('on drag leave')
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });
    }

    const onDragEnter = (event) => {
        const draggedTo = Number(event.currentTarget.dataset.position);

        if (dragAndDrop.draggedEnteredTo !== draggedTo) {

            setDragAndDrop({
                ...dragAndDrop,
                draggedEnteredTo: draggedTo
            });
        }
    }

    const onDragEnd = (event) => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedEnteredTo: null
        });
    }

    const onCampainCancel = () => {
        onCancelCampain();
    }

    const onAddSection = (event, index) => {
        let arr = [...list];
        let newSection = defaultSection[0];
        arr.splice(index + 1, 0, newSection);
        // console.log(arr);
        setList([...arr]);
    }

    const onDeleteSection = (event, deleteSectinoIndex) => {
        let arr = [...list];
        const newList = arr.filter((item, index) => index !== deleteSectinoIndex);
        if (newList.length !== 0) {
            setList([...newList]);
        } else {
            setList([...[defaultSection[0]]]);
        }

    }

    const onQuestionDelete = (event,sectionIndex,questionIndex) => {
        let arr = [...list];
        let section = arr[sectionIndex];
        let questions = section.questions;
        questions.splice(questionIndex,1);
        setList([...arr]);
    }

    const onAddQuestion = (event,sectionIndex,questionIndex) => {
        let arr = [...list];
        let section = arr[sectionIndex];
        let questions = section.questions;
        questions.push(defaultSection[0].questions[0]);
        setList([...arr]);
    }

    const onSectionGoDown = (event, index) => {
        let arr = [...list];
        console.log(arr);
        let temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
        setList([...arr]);
    }

    const onSectionGoUp = (event, index) => {
        let arr = [...list];
        let temp = arr[index];
        arr[index] = arr[index - 1];
        arr[index - 1] = temp;
        setList([...arr]);
    }

    return (
        <div>



            <section className={"campaign-section"} id="campain-details-enter">
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

            <section className={"campaign-section"} id='campaign-create-add-section'>
                <Button style={{ marginLeft: '20px' }} variant="contained" onClick={() => { onAddSection() }}>
                    create campaign
                </Button>
                <Button onClick={() => { onCampainCancel() }}>
                    cancel
                </Button>

            </section>

            <section className={"campaign-section"}>
                <ul>

                    {list[0] && list.map((section, sectionIndex) => {
                        return (
                            <li
                                key={sectionIndex}
                                data-position={sectionIndex}
                                draggable

                                onDragStart={onDragStart}

                                onDragOver={onDragOver}

                                onDrop={onDrop}

                                onDragEnd={onDragEnd}

                                onDragLeave={onDragLeave}

                                onDragEnter={onDragEnter}

                                className={dragAndDrop && dragAndDrop.draggedEnteredTo === Number(sectionIndex) ? "dropArea" : ""}
                            >
                                <div id='draggable-portion'>
                                    {sectionIndex !== 0 &&
                                        <Button className={'section-up-down'} onClick={(e) => onSectionGoUp(e, sectionIndex)}>
                                            <KeyboardArrowUpIcon />
                                        </Button>
                                    }
                                    {
                                        sectionIndex !== (list.length - 1) &&
                                        <Button className={'section-up-down'} onClick={(e) => onSectionGoDown(e, sectionIndex)}>
                                            <KeyboardArrowDownIcon />
                                        </Button>
                                    }
                                    <DragIndicatorIcon />
                                    <Button onClick={(e) => onAddSection(e, sectionIndex)} >
                                        <AddCircleIcon />
                                    </Button>
                                </div>

                                <div id='campaign-section-desc'>

                                    <div id='campaign-section-name-delete'>
                                        <TextField placeholder='section name' value={section.title} id="standard-basic" variant="standard" />
                                        <Button onClick={(e) => onDeleteSection(e, sectionIndex)}>
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                    <Box id='campaign-box'>
                                        {section.questions[0] && section.questions.map((question, questionIndex) => {
                                            return (<Card className={"campain-question-description-box"} variant="outlined">
                                                <TextField
                                                    label="Question Id"
                                                    id="standard-start-adornment"
                                                    sx={{ m: 1, width: "25ch" }}
                                                    value="some question"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start"> </InputAdornment>
                                                        )
                                                    }}
                                                    variant="standard"
                                                />

                                                <TextField
                                                    label="Question Name"
                                                    id="standard-start-adornment"
                                                    sx={{ m: 1, width: "25ch" }}
                                                    value="some question"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start"> </InputAdornment>
                                                        )
                                                    }}
                                                    variant="standard"
                                                />


                                                <TextField
                                                    label="Question Desc"
                                                    id="standard-start-adornment"
                                                    sx={{ m: 1, width: "25ch" }}
                                                    value="some question"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start"> </InputAdornment>
                                                        )
                                                    }}
                                                    variant="standard"
                                                />

                                                <Button id='delete-question-button' onClick={(e)=>onQuestionDelete(e,sectionIndex,questionIndex)}>
                                                    <ClearIcon />
                                                </Button>

                                                <br />
                                                <br />
                                                <br />

                                                <TextField fullWidth placeholder='Text' id="standard-basic" variant="standard" />

                                                <br />
                                                <br />

                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={10}
                                                        label="Age"
                                                    // onChange={handleChange}
                                                    >
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <br />
                                                <br />

                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">options</FormLabel>
                                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Card>
                                            )
                                        })}
                                    </Box>

                                    <Button onClick={(e)=>onAddQuestion(e,sectionIndex,section.questions.length)} id='campaign-question-add-button' variant="contained">
                                        add question
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