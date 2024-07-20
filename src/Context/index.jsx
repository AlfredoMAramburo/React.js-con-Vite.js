import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState('');
  const [searchByCategory, setSearchByCategory] = useState('');

  // Product Detail functions
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu functions
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const filterItemByTitle = (items, searchByTitle) => {
    return items.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
  };

  const filterItemByCategory = (items, searchByCategory) => {
    return items.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()));
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    switch (searchType) {
      case 'BY_TITLE':
        return filterItemByTitle(items, searchByTitle);
      case 'BY_CATEGORY':
        return filterItemByCategory(items, searchByCategory);
      case 'BY_TITLE_AND_CATEGORY':
        return filterItemByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
      default:
        return items;
    }
  };

  useEffect(() => {
    let filteredItems = items;
    if (searchByTitle && searchByCategory) {
      filteredItems = filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory);
    } else if (searchByTitle) {
      filteredItems = filterBy('BY_TITLE', items, searchByTitle, searchByCategory);
    } else if (searchByCategory) {
      filteredItems = filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory);
    }
    setFilterItems(filteredItems);
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      isProductDetailOpen,
      openProductDetail,
      closeProductDetail,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      setSearchByTitle,
      searchByTitle,
      filterItems,
      searchByCategory,
      setSearchByCategory
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
