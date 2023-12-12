import axios from 'axios'
import Swal from 'sweetalert2'

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php'
let categories = []
let sortOrder = 'az'

const fetchDataAndDisplay = async () => {
  try {
    const response = await axios.get(apiUrl)
    categories = response.data.categories

    if (sortOrder === 'az') {
      categories.sort((a, b) => a.strCategory.localeCompare(b.strCategory))
    } else if (sortOrder === 'za') {
      categories.sort((a, b) => b.strCategory.localeCompare(a.strCategory))
    }

    const cardRow = document.getElementById('cardRow')
    cardRow.classList.add('justify-content-center')
    cardRow.innerHTML = ''

    categories.forEach(category => {
      const categoryCard = createCategoryCard(category)
      cardRow.appendChild(categoryCard)
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const searchCategories = query => {
  const cardRow = document.getElementById('cardRow')
  cardRow.innerHTML = ''
  const filteredCategories = categories.filter(category =>
    category.strCategory.toLowerCase().includes(query.toLowerCase())
  )

  if (filteredCategories.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Makanan Tidak Ada',
      text: 'Maaf, tidak ada hasil yang cocok dengan pencarian Anda.'
    })
    fetchDataAndDisplay()
  }

  filteredCategories.forEach(category => {
    const categoryCard = createCategoryCard(category)
    cardRow.appendChild(categoryCard)
  })
}

const createCategoryCard = category => {
  const categoryCard = document.createElement('div')
  categoryCard.className = 'card mb-4'
  categoryCard.style.width = '18rem'
  categoryCard.innerHTML = `
        <img src="${category.strCategoryThumb}" class="card-img-top" alt="${
    category.strCategory
  }">
        <div class="card-body">
            <h5 class="card-title">${category.strCategory}</h5>
            <p class="card-text">${truncateText(
              category.strCategoryDescription
            )}</p>
            <button class="btn btn-primary toggle-description">Show Description</button>
        </div>
    `

  const toggleButton = categoryCard.querySelector('.toggle-description')
  toggleButton.addEventListener('click', () => {
    const descriptionText = categoryCard.querySelector('.card-text')
    toggleDescription(descriptionText)
  })

  return categoryCard
}

export const truncateText = (text, maxLength = 100) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text

export const toggleDescription = descriptionElement => {
  if (descriptionElement.classList.contains('show-description')) {
    descriptionElement.classList.remove('show-description')
  } else {
    descriptionElement.classList.add('show-description')
  }
}

window.onload = () => {
  fetchDataAndDisplay()

  const searchInput = document.getElementById('searchInput')
  const searchButton = document.getElementById('searchButton')
  const refreshButton = document.getElementById('refreshButton')
  const alphabeticalFilter = document.querySelector('alphabetical-filter')

  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim()
    if (query === '') {
      Swal.fire({
        icon: 'error',
        title: 'Silahkan Input Menu',
        text: 'Mohon masukkan nama makanan terlebih dahulu.'
      })
    } else {
      searchCategories(query)
    }
  })

  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim()
      if (query === '') {
        Swal.fire({
          icon: 'error',
          title: 'Silahkan Input Menu',
          text: 'Mohon masukkan nama makanan terlebih dahulu.'
        })
      } else {
        searchCategories(query)
      }
    }
  })

  refreshButton.addEventListener('click', () => {
    fetchDataAndDisplay()
  })

  alphabeticalFilter.addEventListener('filter-changed', event => {
    sortOrder = event.detail
    fetchDataAndDisplay()
  })
}
