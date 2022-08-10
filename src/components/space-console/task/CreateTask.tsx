/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material';
import SubjectVo from '../../../vo/subject.vo';
import CategoryVo from '../../../vo/category.vo';
import { fetchSubjects } from '../../../api/subject.api';
import { fetchCategories } from '../../../api/category.api';
import { LoadingButton } from '@mui/lab';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { createTask } from '../../../api/task.api';
import { postComment } from '../../../api/task-comment.api';
import { LoadingState } from '../../../common/enum';
import { useParams } from 'react-router-dom';

export const CreateTask: FunctionComponent = () => {
  const [subjectList, setSubjectList] = React.useState<SubjectVo[]>([]);
  const [categoryList, setCategoryList] = React.useState<CategoryVo[]>([]);
  const [selectedSubject, setSelectedSubject] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [inputComment, setInputComment] = React.useState('');
  const [createLoadingState, setCreateLoadingState] = React.useState<LoadingState>(LoadingState.PENDING);
  const [showCreatedSnackBar, setShowCreatedSnackBar] = React.useState(false);

  const { userId: userIdString } = useParams();
  const userId = parseInt(userIdString as string);

  function handleSelectedSubjectChange(event: SelectChangeEvent) {
    const selectedSubject = event.target.value;
    setSelectedSubject(selectedSubject);
    setSelectedCategory('');
    setCategoryList([]);

    // load category list
    fetchCategories(parseInt(selectedSubject))
      .then((categoryList) => {
        setCategoryList(categoryList);
      });
  }

  function handleSelectedCategoryChange(event: SelectChangeEvent) {
    setSelectedCategory(event.target.value);
  }

  function handleCreate() {
    setCreateLoadingState(LoadingState.LOADING);
    createTask(parseInt(selectedCategory)).then((taskVo) => {
      postComment(taskVo.id, inputComment)
        .then(() => {
          setShowCreatedSnackBar(true);
          setTimeout(() => {
            setShowCreatedSnackBar(false);
          }, 3500);
          formRestore();
        }).catch(() => {
        setCreateLoadingState(LoadingState.FAILED);
      });
    }).catch(() => {
      setCreateLoadingState(LoadingState.FAILED);
    });
  }

  function formRestore() {
    setCategoryList([]);
    setSelectedSubject('');
    setSelectedCategory('');
    setInputComment('');
    setCreateLoadingState(LoadingState.PENDING);
  }

  React.useEffect(() => {
    // load subject list
    fetchSubjects(userId).then((subjectList) => {
      setSubjectList(subjectList);
    });
  }, []);

  return <Box>
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={showCreatedSnackBar}
      onClose={() => null}
    >
      <Alert severity='success'>Successfully created the task.</Alert>
    </Snackbar>

    <Grid container spacing={2}>
      <Grid item md={4} xs={6}>
        <FormControl fullWidth>
          <InputLabel>Subject</InputLabel>
          <Select
            label='Subject'
            value={selectedSubject}
            onChange={handleSelectedSubjectChange}
          >
            {subjectList.map((subject: SubjectVo) => (
              <MenuItem value={subject.id} key={subject.id}>{subject.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item md={4} xs={6}>
        <FormControl fullWidth>
          <InputLabel>{selectedSubject === '' ? 'Please select a subject' : 'Category'}</InputLabel>
          <Select
            label='Category'
            value={selectedCategory}
            onChange={handleSelectedCategoryChange}
          >
            {categoryList.map((category: CategoryVo) => (
              <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item md={8} xs={12}>
        <FormControl fullWidth>
          <TextField
            label='Comment'
            variant='standard'
            value={inputComment}
            onChange={(event) => {
              setInputComment(event.target.value);
            }}
          />
        </FormControl>
      </Grid>

      <Grid item md={4} xs={6}>
        <LoadingButton
          variant='contained'
          color='info'
          loading={createLoadingState === LoadingState.LOADING}
          loadingPosition='start'
          startIcon={<AddOutlinedIcon />}
          onClick={handleCreate}
        >
          CREATE
        </LoadingButton>
      </Grid>
    </Grid>
  </Box>;
};