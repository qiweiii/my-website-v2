import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom'
import Disqus from 'disqus-react';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 1,
    minHeight: 400,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 5,
      padding: theme.spacing.unit * 3,
      minHeight: 500,
    },
  },
  title: {
    fontWeight: 500,
    padding: theme.spacing.unit * 3,
  },
  author: {
    fontSize: 14,
    color: '#616161',
    paddingLeft: theme.spacing.unit * 3,
  },
  content: {
    padding: theme.spacing.unit * 3,
    minHeight: 400,
    fontSize: 14,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttonDelete: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  }
});


class BlogView extends React.Component {

  async componentDidMount() {
    console.log(this.props);
    // var disqus_config = function () {
    // this.page.url = 'https://qiweiy.me';  // Replace PAGE_URL with your page's canonical URL variable
    // this.page.identifier = this.props.match.params.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    // };
    }

  // async componentDidMount() {
  //   try {
  //     let attachmentURL;
  //     const blog = await this.getNote();
  //     const { content, attachment } = blog;
  //     if (attachment) {
  //       attachmentURL = await Storage.vault.get(attachment);
  //     }

  //     this.setState({
  //       blog,
  //       content: content.content,
  //       title: content.title,
  //       attachmentURL
  //     });
  //   } catch (e) {
  //     alert(e);
  //   }
  // }

  // getNote() {
  //   return API.get("pages", `/pages/${this.props.match.params.id}`);
  // }

  // formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }

  render() {
    const { classes } = this.props;
    const disqusShortname = 'example';
    const disqusConfig = {
        url: 'https://qiweiy.me',
        identifier: this.props.match.params.id,
    };
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom align="center" className={classes.title}>
              {this.props.location.state.title}
            </Typography> 
            <Typography gutterBottom align="left" className={classes.author}>
              Created by {this.props.location.state.author}
            </Typography>
            <div className={classes.content}>
              {this.props.location.state.content.split("\n").map((i, key) => {
                return <Typography align="justify" key={key}>{i}</Typography>;
              })}
            </div>
            {this.props.location.state.noedit ? 
              <div className={classes.buttons}></div>
              :
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleEdit}
                component={RouterLink}
                to={{ 
                  pathname: `/blogs/edit/${this.props.match.params.id}`, 
                  state: {
                    title: this.props.location.state.title,
                    content: this.props.location.state.content,
                    author: this.props.location.state.author,
                  } 
                }}
              >
                Edit
              </Button>
            }
          </Paper>
          <div>
            <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                Comments
            </Disqus.CommentCount>
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}


BlogView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogView);