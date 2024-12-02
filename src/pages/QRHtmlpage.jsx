import {
  Box,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as AppInstagramIcon } from "../assets/icons/AppInstagramIcon.svg";
import { ReactComponent as AppPhoneIcon } from "../assets/icons/AppPhoneIcon.svg";
import { ReactComponent as AppEmailIcon } from "../assets/icons/AppEmailIcon.svg";
import { ReactComponent as AppLocationIcon } from "../assets/icons/AppLocationIcon.svg";
import { ReactComponent as AppLinkedInIcon } from "../assets/icons/AppLinkedInIcon.svg";
import { ReactComponent as AppWebsiteIcon } from "../assets/icons/AppWebsiteIcon.svg";
import { ReactComponent as AppTwitterIcon } from "../assets/icons/AppTwitterIcon.svg";
import { ReactComponent as AppFacebookIcon } from "../assets/icons/AppFacebookIcon.svg";
import { ReactComponent as AppBioIcon } from "../assets/icons/AppBioIcon.svg";
import { ReactComponent as AppWhatsappIcon } from "../assets/icons/AppWhatsappIcon.svg";
import { ReactComponent as AppContactIcon } from "../assets/icons/AddContactIcon.svg";
import bg from "../assets/images/bg.png";
import image from "../assets/images/image.png";
import kssia from "../assets/images/kssia.png";
import { StyledButton } from "../ui/StyledButton";
import { getSingleUser } from "../api/members-api";
import { useParams } from "react-router-dom";
import QRvideoCard from "../ui/QRvideoCard";
import QRCertificateCard from "../ui/QRCertificateCard";
import QRAwardCard from "../ui/QRAwardCard";
import QRProductCard from "../components/QRProductCard";
import StyledReview from "../ui/StyledReview";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const QRHtmlPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const formattedId = id?.endsWith("/") ? id.slice(0, -1) : id;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleUser(formattedId);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSaveContact = () => {
    const vCardData = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${userData?.name}
  ORG:${userData?.company_name}
  TEL:${userData?.phone_numbers?.personal}
  EMAIL:${userData?.email}
  ADR:${userData?.address}
  END:VCARD
      `;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${userData?.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <AppInstagramIcon />;
      case "twitter":
        return <AppTwitterIcon />;
      case "linkedin":
        return <AppLinkedInIcon />;
      case "facebook":
        return <AppFacebookIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          justifyContent="center"
          minHeight={isMobile && "100vh"}
          mb={10}
          style={
            isMobile
              ? {}
              : {
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }
          }
          bgcolor={isMobile ? "#F2F2F2" : "#FFF"}
        >
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <Box
              sx={{
                borderRadius: isMobile ? 0 : 5,
                boxShadow: isMobile ? "none" : 2,
                m: 2,
                p: 2,
              }}
              bgcolor={!isMobile && "#fff"}
            >
              <Stack
                spacing={!isMobile && 4}
                direction={isMobile ? "column" : "row"}
              >
                <Grid item lg={6} sm={12} pl={!isMobile && 4}>
                  <Stack
                    direction={"column"}
                    justifyContent={isMobile ? "center" : "start"}
                    alignItems={isMobile ? "center" : "flex-start"}
                    bgcolor={!isMobile && "#fff"}
                    sx={
                      isMobile
                        ? {
                            backgroundImage: `url(${bg})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                          }
                        : {}
                    }
                    spacing={isMobile ? 0 : 2}
                  >
                    <Stack>
                      <img
                        src={userData?.profile_picture || image}
                        alt="image"
                        width={isMobile ? "130px" : "80px"}
                        height={isMobile ? "130px" : "80px"}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          ...(isMobile && { border: "2px solid #5686C0" }),
                        }}
                      />
                    </Stack>
                    <Stack
                      direction={"column"}
                      alignItems={isMobile && "center"}
                    >
                      <Typography variant="h3" color="textTertiary" textTransform={"capitalize"}>
                      {userData?.abbreviation} {' '} {userData?.name}
                      </Typography>

                      {userData?.company_name && (
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                        >
                          <Stack>
                            <Typography variant="h6">
                              {userData?.company_name}
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              textAlign={isMobile && "center"}
                              textTransform={"capitalize"}
                            >
                              {userData?.designation}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                      {!isMobile && (
                        <Stack spacing={2} mt={2}>
                          <Typography variant="h7" color="#626262" mb={1}>
                            {userData?.bio}
                          </Typography>

                          <StyledButton
                            variant={"preview"}
                            onClick={() => {
                              const whatsappUrl = `https://wa.me/${userData?.phone_numbers?.whatsapp_number}`;
                              window.open(
                                whatsappUrl,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                            name={
                              <>
                                <AppWhatsappIcon
                                  style={{ marginRight: "8px" }}
                                />{" "}
                                SAY HAI
                              </>
                            }
                          />
                          
                          <StyledButton
                            variant={"primary"}
                            name={
                              <>
                                <AppContactIcon
                                  style={{ marginRight: "8px" }}
                                />{" "}
                                SAVE CONTACT
                              </>
                            }
                            onClick={handleSaveContact}
                          />
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                  <Stack
                    mt={4}
                    direction={"row"}
                    bgcolor="#fff"
                    justifyContent={"space-between"}
                    padding={"10px"}
                    borderRadius={"12px"}
                    border={"1px solid rgba(0, 0, 0, 0.12)"}
                    display={isMobile ? "flex" : "none"}
                    alignItems={"center"}
                  >
                    {" "}
                    <img
                      src={kssia}
                      alt="image"
                      width={"93px"}
                      height={"25px"}
                    />
                    <Typography color={"#6D6D6D"} variant="h7">
                      Member ID-{" "}
                      <span style={{ color: "black" }}>
                        {userData?.membership_id}
                      </span>{" "}
                    </Typography>
                  </Stack>
                  <Stack spacing={2} mb={4} mt={4}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Stack>
                        {" "}
                        <AppPhoneIcon />{" "}
                      </Stack>
                      <Typography variant="h7">
                        {userData?.phone_numbers?.personal}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Stack>
                        <AppEmailIcon />{" "}
                      </Stack>
                      <Typography variant="h7">{userData?.email}</Typography>
                    </Stack>
                    {userData?.address && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Stack>
                          {" "}
                          <AppLocationIcon />{" "}
                        </Stack>
                        <Typography variant="h7">
                          {userData?.address}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                  {userData?.bio && isMobile && (
                    <>
                      <AppBioIcon />
                      <Stack>
                        <Typography variant="h7" color="#626262" mt={1} mb={1}>
                          {userData?.bio}
                        </Typography>
                      </Stack>
                    </>
                  )}
                  <Box
                    display={isMobile ? "flex" : "none"}
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    sx={{
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 1000,
                      backgroundColor: "white",
                      padding: 2,
                      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <StyledButton
                      variant={"preview"}
                      onClick={() => {
                        const whatsappUrl = `https://wa.me/${userData?.phone_numbers?.whatsapp_number}`;
                        window.open(
                          whatsappUrl,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      name={
                        <>
                          <AppWhatsappIcon style={{ marginRight: "8px" }} /> SAY
                          HAI
                        </>
                      }
                    />
                    <StyledButton
                      variant={"primary"}
                      name={
                        <>
                          <AppContactIcon style={{ marginRight: "8px" }} /> SAVE
                          CONTACT
                        </>
                      }
                      onClick={handleSaveContact}
                    />
                  </Box>
                  {isMobile &&
                    userData?.reviews &&
                    userData?.reviews?.length > 0 && (
                      <>
                        {" "}
                        <Typography
                          variant="h5"
                          color="textTertiary"
                          mt={2}
                          mb={2}
                        >
                          Reviews
                        </Typography>
                        <Grid container spacing={4} mb={2}>
                          {userData?.reviews?.map((data, index) => (
                            <Grid item xs={12} lg={12} key={index}>
                              <StyledReview review={data} />
                            </Grid>
                          ))}{" "}
                        </Grid>
                      </>
                    )}
                </Grid>{" "}
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    margin: "2px",
                  }}
                />
                <Grid
                  item
                  lg={6}
                  sm={12}
                  pr={!isMobile && 4}
                  sx={
                    !isMobile
                      ? {
                          maxHeight: "90vh",
                          overflowY: "auto",
                          overflowX: "hidden",
                          "&::-webkit-scrollbar": {
                            width: "8px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f0f0f0",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#CACACA",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#CACACA",
                          },
                        }
                      : {}
                  }
                >
                  {userData?.social_media &&
                    userData?.social_media?.length > 0 && (
                      <>
                        {" "}
                        <Typography
                          variant="h5"
                          color="textTertiary"
                          mt={1}
                          mb={2}
                        >
                          Social Media
                        </Typography>
                        <Stack>
                          <Grid container spacing={isMobile ? 0 : 2}>
                            {" "}
                            {userData?.social_media?.map((media, index) => (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                key={index}
                                paddingBottom={isMobile && 3}
                              >
                                {" "}
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="flex-start"
                                  bgcolor={isMobile ? "#fff" : "#f2f2f2"}
                                  borderRadius={"12px"}
                                  p={2}
                                >
                                  {renderSocialIcon(media?.platform)}{" "}
                                  <Typography
                                    variant="h5"
                                    color="#6D6D6D"
                                    fontWeight={400}
                                    ml={1}
                                  >
                                    <a
                                      href={media?.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        color: "#6D6D6D",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {media?.platform}
                                    </a>
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Stack>
                      </>
                    )}{" "}
                  {userData?.websites && userData?.websites?.length > 0 && (
                    <>
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={2}
                        mb={1}
                        pt={2}
                      >
                        Websites & links
                      </Typography>{" "}
                      <Grid container spacing={3}>
                        {" "}
                        {userData?.websites?.map((website, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            {" "}
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-start"
                              bgcolor={isMobile ? "#fff" : "#F4F9FF"}
                              borderRadius={"12px"}
                              p={2}
                              mb={2}
                            >
                              <Stack>
                                <AppWebsiteIcon />{" "}
                              </Stack>
                              <Typography
                                variant="h5"
                                color="#6D6D6D"
                                fontWeight={400}
                                ml={1}
                              >
                                <a
                                  href={website?.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "#6D6D6D",
                                  }}
                                >
                                  {website?.url}
                                </a>
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}{" "}
                  {userData?.video && userData?.video?.length > 0 && (
                    <Typography
                      variant="h5"
                      color="textTertiary"
                      mt={2}
                      mb={2}
                      pt={2}
                    >
                      Video title
                    </Typography>
                  )}
                  {userData?.video?.length > 0 && (
                    <Carousel
                      responsive={responsive}
                      infinite={true}
                      swipeable={true}
                      draggable={true}
                      autoPlay={true}
                      autoPlaySpeed={2000}
                      keyBoardControl={true}
                      showDots={false}
                    >
                      {userData?.video?.map(
                        (videoItem, index) =>
                          videoItem?.url && (
                            <div key={index}>
                              <QRvideoCard url={videoItem.url} />
                            </div>
                          )
                      )}
                    </Carousel>
                  )}
                  {userData?.certificates &&
                    userData?.certificates?.length > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          color="textTertiary"
                          mt={2}
                          mb={2}
                          pt={2}
                        >
                          Certificates
                        </Typography>
                        <Grid container spacing={2}>
                          {userData?.certificates?.map((certificate, index) => (
                            <>
                              {" "}
                              <Grid item xs={12} lg={6} key={index}>
                                <QRCertificateCard
                                  isMobile
                                  certificate={certificate}
                                />
                              </Grid>
                            </>
                          ))}
                        </Grid>
                      </>
                    )}
                  {userData?.awards && userData?.awards?.length > 0 && (
                    <>
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={1}
                        mb={1}
                        pt={2}
                      >
                        Awards
                      </Typography>
                      <Grid container spacing={2} mt={2} mb={5}>
                        {userData?.awards?.map((award, index) => (
                          <>
                            {" "}
                            <Grid item xs={6} lg={6} key={index}>
                              <QRAwardCard award={award} ismobile />
                            </Grid>
                          </>
                        ))}
                      </Grid>{" "}
                    </>
                  )}{" "}
                  {Array.isArray(userData?.products) &&
                    userData?.products.length > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          color="textTertiary"
                          mt={2}
                          mb={2}
                        >
                          Products
                        </Typography>
                        <Grid container spacing={2}>
                          {userData.products.map((certificate, index) => (
                            <Grid item xs={6} sm={6} lg={6} key={index}>
                              <QRProductCard product={certificate} isMobile />
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}{" "}
                  {!isMobile &&
                    userData?.reviews &&
                    userData?.reviews?.length > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          color="textTertiary"
                          mt={2}
                          mb={2}
                        >
                          Reviews
                        </Typography>
                        <Grid container spacing={4}>
                          {userData?.reviews?.map((data, index) => (
                            <Grid item xs={12} lg={12} key={index}>
                              <StyledReview review={data} />
                            </Grid>
                          ))}{" "}
                        </Grid>
                      </>
                    )}
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default QRHtmlPage;
