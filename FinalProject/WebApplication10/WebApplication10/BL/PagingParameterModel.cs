using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication10.BL
{
    public class PagingParameterModel
    {

        /*https://www.c-sharpcorner.com/article/how-to-do-searching-with-paging-in-asp-net-web-api/*/
        const int maxPageSize = 20;
        public int pageNumber { get; set; } = 1;
        public int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set
            {
                pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
        public string QuerySearch { get; set; }

        public void ConfigurePagingParameter(int count)
        {

            // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
            int CurrentPage = this.pageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
            int PageSize = this.PageSize;

            // Display TotalCount to Records to User  
            int TotalCount = count;

            // Calculating Totalpage by Dividing (No of Records / Pagesize)  
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            // if CurrentPage is greater than 1 means it has previousPage  
            var previousPage = CurrentPage > 1 ? "Yes" : "No";

            // if TotalPages is greater than CurrentPage means it has nextPage  
            var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

            // Object which we are going to send in header   
            var paginationMetadata = new
            {
                totalCount = TotalCount,
                pageSize = PageSize,
                currentPage = CurrentPage,
                totalPages = TotalPages,
                previousPage,
                nextPage,
                QuerySearch = string.IsNullOrEmpty(this.QuerySearch) ?
                              "No Parameter Passed" : this.QuerySearch
            };

            // Setting Header  
            HttpContext.Current.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
        }
    }



}
