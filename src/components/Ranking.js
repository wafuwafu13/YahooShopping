import React from 'react';
import Card, { CardMedia, CardContent,CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

const name_s =  {
  color:"red"
}

const card_s = {
  color:"gold"
}

export default class Ranking extends React.Component {
  componentWillMount() {
    this.props.onMount(this.props.categoryId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.categoryId !== nextProps.categoryId) {
      this.props.onUpdate(nextProps.categoryId);
    }
  }

  render() {
    const { category, ranking, error } = this.props;

    return (
      <div >
        <h2 style={name_s}>{
          typeof category !== 'undefined'
            ? `${category.name}のランキング`
            : ''
        }</h2>

        {(() => {
          if (error) {
            return <p>エラーが発生しました。リロードしてください。</p>;
          } else if (typeof ranking === 'undefined') {

            return <p>ちょっと待って！！！</p>;
          } else {

            return ranking.map((item, i) =>(
                <Card
                  key={`ranking-item-${item.code}`}
                  style={{maxWidth: '500px',margin: '32px auto'}}
                >
                <CardMedia
                 image={item.imageUrl}
                 title={`${i + 1}位  ${item.name}`}
                 style={{height:'200px'}}
                />
                <CardContent>
                    <Typography type="title" style={card_s}>
                        {`${i + 1}位`}
                    </Typography>
                    <Typography>
                        {`${item.name}`}
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button
                   raised
                   color="secondary"
                   fullWidth
                   href={item.url}
                   >商品ページへ</Button>
                </CardActions>
                </Card>

            ));
            }
        })()}
      </div>
    );
  }
}

Ranking.propTypes = {
  categoryId: PropTypes.string.isRequired,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,


  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.bool.isRequired
};
Ranking.defaultProps = {
    categoryId: '1'
};