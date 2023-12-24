//
function bookList({ data }) {
  return `

          <tr class="course-item">
            <td>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="{{x.bookID}}"
                  name="bookIds[]"
                />
              </div>
            </td>
            <th scope="row"></th>
            <td colspan="2">${data.Title}</td>
            <td>
              <img style="width: 100px" src="${data.ImageBook}" alt="" />
            </td>
            <td>${data.Price}</td>
            <td>${data.Stock}</td>
            <td>
              <a
                href=""
                class="btn btn-link btn-delete-course"
                data-id="{{x.bookID}}"
                >Xóa
              </a>
              <!-- <a
                href=""
                class="btn btn-link btn-detail-course"
                data-id="{{x.courseId}}"
                >Chi tiết
              </a> -->
            </td>
          </tr>

  
 
    
    `;
}

export default bookList;
