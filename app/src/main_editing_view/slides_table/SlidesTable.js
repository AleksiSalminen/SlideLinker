import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import SlidesTableSortButton from './SlidesTableSortButton.js';
import SlidesTableFilterButton from './SlidesTableFilterButton';


/**
 * Function that returns the view containing the table of slides
 * @param {Object} props received parameters
 */
function SlidesTable(props) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(5);

  /* Filtering settings */
  const [filterHeading, setFilterHeading] = useState(null);
  const [filterDescription, setFilterDescription] = useState(null);

  const setActiveView = props.activeViewSettings.setActiveView;
  const SLIDE_EDITING_VIEW = props.activeViewSettings.SLIDE_EDITING_VIEW;

  let slides = [];
  if(props.slides && props.slides.length) {
    slides = props.slides
  }

  /* Apply filters */

  if(filterHeading) {
    slides = slides.filter(slide => slide.heading.includes(filterHeading));
  }

  if(filterDescription) {
    slides = slides.filter(slide => slide.description.includes(filterDescription));
  }

  
  /** Function that changes the page of the table */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /** Function that changes the number of slides shown per page */
  const handleChangeRowsPerPage = (event) => {
    setSlidesPerPage(+event.target.value);
    setPage(0);
  };

  /** Function that finds a slide with a certain ID.
  If no match is found, returns null */
  const findSlide = (slideArray, idToFind) => {
    for(let i = 0; i < slideArray.length; i++) {
      if(slideArray[i]['id'] === idToFind) {
          return slideArray[i];
      }
    }
    return null;
  }

  /** Function that sets the selected slide to be the slide chosen
  and changes the slide editing view to be active */
  const selectSlide = (id) => {
    const slide = findSlide(slides, id);
    if(slide) {
      props.selectSlide(slide);
      setActiveView(SLIDE_EDITING_VIEW);
    }
  }

  return (
    <div style={{width:"90%", margin:"auto", paddingTop:"1.0rem", paddingBottom:"1.0rem", borderStyle:"double", borderWidth:"thin", borderRadius:"1.0rem", borderColor:"lightgrey"}}>

      <Box>
        &nbsp;&nbsp;&nbsp;&nbsp;

        <SlidesTableSortButton
          slides={props.slides}
          updateSlides={props.updateSlides}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;

        <SlidesTableFilterButton
          filterHeading={filterHeading}
          setFilterHeading={setFilterHeading}
          filterDescription={filterDescription}
          setFilterDescription={setFilterDescription}
        />
      </Box>
      <br/>
      
      <Box>
        <Paper>
          <TableContainer>
            <Table style={{borderStyle:"double hidden hidden hidden", borderColor:"lightgrey", borderWidth:"thin"}} stickyHeader aria-label="slides table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button variant="outlined" size="small">+</Button>
                  </TableCell>
                  <TableCell>
                    {t("SlidesTable.Heading")}
                  </TableCell>
                  <TableCell>
                    {t("SlidesTable.Description")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slides.slice(page * slidesPerPage, page * slidesPerPage + slidesPerPage).map((row, index) => (
                  <TableRow hover onClick={() => { selectSlide(row.id) }} key={row.name + "-" + index}>
                    <TableCell component="th" scope="row">
                      (image)
                    </TableCell>
                    <TableCell>
                      {row.heading}
                    </TableCell>
                    <TableCell>
                      {row.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            component="div"
            count={slides.length}
            rowsPerPage={slidesPerPage}
            labelRowsPerPage={t("SlidesTable.RowsPerPage")}
            backIconButtonText={t("SlidesTable.BackButton")}
            nextIconButtonText={t("SlidesTable.NextButton")}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

    </div>
  );
}

export default SlidesTable;
