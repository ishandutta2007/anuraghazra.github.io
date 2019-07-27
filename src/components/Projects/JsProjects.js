import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';

import PageHeader from 'src/components/common/PageHeader';

import IFrame from 'src/components/common/IFrame';
import Button, { IconButton } from 'src/components/common/Button';

import { ProjectLinks, ProjectPreview } from './ProjectTemplate.style'
import ProjectTemplate from './ProjectTemplate';

const JsProjectsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};

  @media ${props => props.theme.media.tablet} {
    .iframe-wrapper {
      min-height: 400px;
    }
  }
`

const JsProjects = () => {
  const jsprojects = useStaticQuery(
    graphql`
      query {
        allJsprojectsJson {
          edges {
            node {
              description
              links {
                github
                codepen
                download
              }
              title
              id
            }
          }
        }
      }
    `
  );

  return (
    <JsProjectsWrapper>
      <PageHeader>Javascript Libraries</PageHeader>

      {
        jsprojects.allJsprojectsJson.edges.map(({ node }) => (
          <ProjectTemplate
            key={node.id}
            title={node.title}
            desc={node.description}
            links={
              <ProjectLinks>
                <Button as="a" href={node.links.download}>Download</Button>
                <IconButton label="github" href={node.links.github} icon={["fab", "github"]} />
              </ProjectLinks>
            }
            preview={
              <ProjectPreview>
                <IFrame src={node.links.codepen} />
              </ProjectPreview>
            }
          />
        ))
      }

    </JsProjectsWrapper>
  )
}

export default JsProjects;




// const SmallProjectCard = styled.div`
//   /* because of project links */
//   position: relative;

//   background-color: ${props => props.theme.primaryWhite};
//   border-radius: 10px;
//   padding: 30px;
//   height: 280px;

//   h3 {
//     color: ${props => props.theme.primaryColor};
//     margin-bottom: 5px;
//   }

//   .smallproject__links {
//     position: absolute;
//     bottom: 20px;
//   }
// `
// {/* <ProjectWrapper key={node.id}>
//   <ProjectContent>
//     <ProjectDetail>
//       <div className="project__detail-container">
//         <h2>{node.title}</h2>
//         <p>
//           {node.description}
//         </p>
//         <ProjectLinks>
//           <Button as="a" href={node.links.donwload}>Download</Button>
//           <IconButton label="github" href={node.links.github} icon={["fab", "github"]} />
//         </ProjectLinks>
//       </div>
//     </ProjectDetail>

//     <ProjectPreview>
//       <IFrame src={node.links.codepen} />
//     </ProjectPreview>
//   </ProjectContent>
// </ProjectWrapper> */}