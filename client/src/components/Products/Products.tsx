import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ICatalogProduct } from '@typings/state/index';
import FiltersList from '../FiltersList';
import Product from '../Product';
import '@styles/Products.css';

interface Props {
  catalogLoaded: boolean;
  catalog: ICatalogProduct[];
  sortBy: string;
  initCatalog: () => void;
  clearFilters: () => void;
  setSortBy: (value: string) => void;
}

interface State {
  drawerOpen: boolean;
  value: string;
}

export class Products extends React.Component<Props, State> {
  state = {
    drawerOpen: false,
    value: this.props.sortBy || 'Name: A-Z'
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleChange = (e: React.ChangeEvent, index: number, value: string) => {
    this.props.setSortBy(value);
    this.setState({ value });
  }

  componentWillMount() {
    this.props.initCatalog();
  }

  render() {
    const {
      catalogLoaded,
      catalog,
      clearFilters
    } = this.props;

    if(!catalogLoaded) {
      return (
        <div className="loader">
          <img src="/img/loader.gif" />
          <h1>LOADING PRODUCTS...</h1>
        </div>
      );
    } else return (
      <div className="products">
        <div className="products-handle">
          <div className="products-found">
            <span><b>Products found: </b>{catalog.length}</span>
          </div>
          <div className="filters">
            <div className="set-filters">
              <RaisedButton
                className="btn"
                label="Filter products"
                onClick={this.toggleDrawer}
                primary={true}
              />
            </div>
            <RaisedButton
              className="btn"
              label="Clear Filters"
              onClick={clearFilters}
              secondary={true}
            />
          </div>
          <div className="products-sort">
            <span><b>Sort By:</b></span>
            <SelectField
              className="sort-field"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem value="Name: A-Z" primaryText="Name: A-Z" />
              <MenuItem value="Name: Z-A" primaryText="Name: Z-A" />
              <MenuItem value="Price: Low to High" primaryText="Price: Low to High" />
              <MenuItem value="Price: High to Low" primaryText="Price: High to Low" />
            </SelectField>
            <Drawer 
              docked={false}
              width={200}
              open={this.state.drawerOpen}
              onRequestChange={this.toggleDrawer}
            >
              <FiltersList />
            </Drawer>
          </div>
        </div>
        {catalog.length ?
          catalog.map((item) => {
            return <Product key={item.info.name} item={item} />
          }) :
          <>
          <h1 className="no-products" style={{color:"#db6400"}}>No products found!</h1>
          <img src="/img/404.svg" className="image404" />
          </>
          }
      </div>
    )
  }
}

export default Products;
