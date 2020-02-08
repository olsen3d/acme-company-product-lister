/* eslint-disable  */
const companies = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies').then( response => response.data)

const products = axios.get('https://acme-users-api-rev.herokuapp.com/api/products').then( response => response.data)



const { Component } = React 
const { render } = ReactDOM
const root = document.querySelector('#root')

// const Nav = () => React.createElement('nav', null, 'companies and products')

//companies products and view

const companiesData = ({ companies}) => {
    const lis = companies.map( (company, idx) => {
        return React.createElement('li', {key: idx}, company.name)
    })
    return React.createElement('ul', null, lis)
}

const productsData = ({ products}) => {
    const lis = products.map( (product, idx) => {
        return React.createElement('li', {key: idx}, product.name)
    })
    return React.createElement('ul', null, lis)
}

const Nav = ({ companies, products, view}) => {
    console.log(view)
    const productsTitle = React.createElement('a', { href: '#products', className: `${view === 'products' ? 'selected' : ''}`}, `Products (${products.length})`)
    const companiesTitle = React.createElement('a', { href: '#companies', className: `${view === 'companies' ? 'selected' : ''}`}, `Companies (${companies.length})`)
    return React.createElement('div', {className: 'navBar'}, productsTitle, companiesTitle)
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            companies: [],
            products: [],
            view: 'companies'
        }
    }
    componentDidMount () {
        companies.then( result => this.setState({
            companies: result
        }))
        products.then( result => this.setState({
            products: result
        }))
    }

    render() {
        const { companies, products, view } = this.state
        const showCompanies = React.createElement(companiesData, {companies})
        const showProducts = React.createElement(productsData, {products})
        const nav = React.createElement(Nav, { companies, products, view})
        let chosenView
        if (view === 'companies') {
            chosenView = showCompanies
        } else {
            chosenView = showProducts
        }
        return React.createElement('div', null, nav, chosenView)
    }
}

render(React.createElement(App), root)
