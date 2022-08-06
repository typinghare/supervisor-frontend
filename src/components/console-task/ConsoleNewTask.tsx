import { Component } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import SubjectVo from '../../vo/subject.vo';
import CategoryVo from '../../vo/category.vo';
import { fetchSubjects } from '../../api/subject.api';
import { fetchCategories } from '../../api/category';
import { LoadingButton } from '@mui/lab';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { createTask } from '../../api/task.api';
import TaskVo from '../../vo/task.vo';
import { postComment } from '../../api/task-comment.api';
import { localUser } from '../../common/user';

interface ConsoleNewTaskProps {}

interface ConsoleNewTaskState {
  subjectList: SubjectVo[];
  categoryList: CategoryVo[];
  selectedSubject: string;
  selectedCategory: string;
  inputComment: string;
  snackBarOpen: boolean;
  creating: boolean;
}

const categoryPlaceholder = { id: 0, name: 'Please select a subject.' };

export default class ConsoleNewTask extends Component<ConsoleNewTaskProps, ConsoleNewTaskState> {
  constructor(props: ConsoleNewTaskProps) {
    super(props);
    this.state = {
      subjectList: [],
      categoryList: [categoryPlaceholder],
      selectedSubject: '',
      selectedCategory: '',
      inputComment: '',
      snackBarOpen: false,
      creating: false,
    };
  }

  componentDidMount() {
    // load subjects
    fetchSubjects(localUser.userId)
      .then((response) => {
        const { data: subjectList } = response.data;
        this.setState({ subjectList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selectChangeEvent = (event: SelectChangeEvent) => {
    const selectedSubject = event.target.value;
    this.setState({
      selectedSubject: selectedSubject,
      selectedCategory: '',
      categoryList: [],
    });

    // load categories
    fetchCategories(parseInt(selectedSubject))
      .then((response) => {
        const { data: categoryList } = response.data;
        this.setState({ categoryList });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCategoryChange = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value;
    this.setState({ selectedCategory });
  };

  render = () => (
    <Grid container spacing={2}>
      {/* subject select box */}
      <Grid item md={4} xs={6}>
        <FormControl fullWidth>
          <InputLabel>Subject</InputLabel>
          <Select
            label="Subject"
            value={this.state.selectedSubject}
            onChange={this.selectChangeEvent}
          >
            {this.state.subjectList.map((subject: SubjectVo) => (
              <MenuItem value={subject.id} key={subject.id}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* category select box */}
      <Grid item md={4} xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          >
            {this.state.categoryList.map((category: CategoryVo) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* comment text field */}
      <Grid item md={8} xs={12}>
        <FormControl fullWidth>
          <TextField
            label="Comment"
            variant="standard"
            value={this.state.inputComment}
            onChange={(event) => {
              this.setState({ inputComment: event.target.value });
            }}
          />
        </FormControl>
      </Grid>

      <Grid item md={4} xs={6}>
        <LoadingButton
          variant="contained"
          color="info"
          loading={this.state.creating}
          loadingPosition="start"
          startIcon={<AddOutlinedIcon />}
          onClick={this.handleCreate}
        >
          CREATE
        </LoadingButton>
      </Grid>
    </Grid>
  );

  handleCreate = () => {
    this.setState({ creating: true });

    createTask(parseInt(this.state.selectedCategory)).then((response) => {
      const taskVo: TaskVo = response.data.data;
      if (taskVo) {
        postComment(taskVo.id, this.state.inputComment)
          .then((response) => {
            if (response.status === 201) {
              this.formRestore();
            }
          })
          .catch(() => {
            this.setState({ creating: false });
          });
      }
    });
  };

  formRestore = () => {
    this.setState({
      creating: false,
      subjectList: [],
      categoryList: [categoryPlaceholder],
      selectedSubject: '',
      selectedCategory: '',
      inputComment: '',
    });
  };
}