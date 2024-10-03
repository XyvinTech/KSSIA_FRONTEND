import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as AppInstagramIcon } from "../assets/icons/AppInstagramIcon.svg";
import { ReactComponent as AppPhoneIcon } from "../assets/icons/AppPhoneIcon.svg";
import { ReactComponent as AppEmailIcon } from "../assets/icons/AppEmailIcon.svg";
import { ReactComponent as AppLocationIcon } from "../assets/icons/AppLocationIcon.svg";
import { ReactComponent as AppLinkedInIcon } from "../assets/icons/AppLinkedInIcon.svg";
import { ReactComponent as AppWebsiteIcon } from "../assets/icons/AppWebsiteIcon.svg";
import { ReactComponent as AppTwitterIcon } from "../assets/icons/AppTwitterIcon.svg";

import { useParams } from "react-router-dom";
import { StyledButton } from "../ui/StyledButton";
import Video from "../components/Video";
import CertificateCard from "../components/CertificateCard";
import AwardCard from "../components/AwardCard";
import { getSingleUser } from "../api/members-api";
import StyledReview from "../ui/StyledReview";

const QRPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const formattedId = id?.endsWith('/') ? id.slice(0, -1) : id;
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
FN:${userData?.name?.first_name} ${userData?.name?.last_name}
ORG:${userData?.company_name}
TEL:${userData?.phone_numbers?.personal}
EMAIL:${userData?.email}
ADR:${userData?.address}
END:VCARD
    `;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${userData?.name?.first_name}_${userData?.name?.last_name}.vcf`;
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
      default:
        return null;
    }
  };
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Box
              sx={{
                p: 4,
                bgcolor: "#FFFFFF",
                borderRadius: 5,
                boxShadow: 2,
                mt: 4,
              }}
            >
              <Stack justifyContent={"center"} alignItems={"center"}>
                <img
                  src={userData?.profile_picture}
                  alt="image"
                  width={"130px"}
                  height={"139px"}
                />
                <Typography variant="h3" color="textTertiary" mt={1} mb={1}>
                  {userData?.name?.first_name} {userData?.name?.middle_name}{" "}
                  {userData?.name?.last_name}
                </Typography>
              </Stack>
              <Typography variant="h5" color="textTertiary" mt={1} mb={1}>
                Personal
              </Typography>
              <Stack spacing={2} mb={4} mt={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AppPhoneIcon />
                  <Typography variant="h7">
                    {userData?.phone_numbers?.personal}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AppEmailIcon />
                  <Typography variant="h7">{userData?.email}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AppLocationIcon />
                  <Typography variant="h7">{userData?.address}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h7" color="#626262" mt={1} mb={1}>
                {userData?.bio}
              </Typography>
              <Typography variant="h5" color="textTertiary" mt={4} mb={2}>
                Company
              </Typography>
              <Stack direction={"row"} spacing={2} mb={4}>
                <a
                  href={`https://wa.me/${userData?.phone_numbers?.personal}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  rel="noopener noreferrer"
                >
                  <StyledButton variant={"primary"} name={"SAY HAI"} />
                </a>
                <StyledButton
                  variant={"secondary"}
                  name={"SAVE CONTACT"}
                  onClick={handleSaveContact}
                />
              </Stack>
              {userData?.reviews && userData?.reviews?.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    color="textTertiary"
                    mt={1}
                    mb={1}
                    pt={2}
                  >
                    Certificates
                  </Typography>
                  {userData?.reviews?.map((data, index) => (
                    <Stack key={index} direction={"row"}spacing={1}>
                      <StyledReview review={data} />
                    </Stack>
                  ))}{" "}
                </>
              )}{" "}
              {userData?.social_media && userData?.social_media?.length > 0 && (
                <>
                  {" "}
                  <Typography variant="h5" color="textTertiary" mt={2} mb={1}>
                    Social Media
                  </Typography>
                  <Stack spacing={2}>
                    {" "}
                    {userData?.social_media?.map((media, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        bgcolor="#F2F2F2"
                        borderRadius={"12px"}
                        p={2}
                      >
                        {renderSocialIcon(media?.platform)}
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
                          >
                            {media?.url}
                          </a>
                        </Typography>
                      </Box>
                    ))}{" "}
                  </Stack>{" "}
                </>
              )}{" "}
              {userData?.websites && userData?.websites?.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    color="textTertiary"
                    mt={1}
                    mb={1}
                    pt={2}
                  >
                    Websites & links
                  </Typography>{" "}
                  {userData?.websites?.map((website, index) => (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      bgcolor="white"
                      borderRadius={"12px"}
                      p={2}
                    >
                      <AppWebsiteIcon />
                      <Typography
                        variant="h5"
                        color="#6D6D6D"
                        fontWeight={400}
                        ml={1}
                      >
                        <a
                          href={website?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {website?.name}
                        </a>
                      </Typography>
                    </Box>
                  ))}{" "}
                </>
              )}{" "}
              {userData?.video && userData?.video?.length > 0 && (
                <Typography
                  variant="h5"
                  color="textTertiary"
                  mt={1}
                  mb={1}
                  pt={2}
                >
                  Video title
                </Typography>
              )}
              {userData?.video?.map((videoItem, index) => (
                <Video url={videoItem.url} />
              ))}{" "}
            {/* {userData?.products?.length > 0 && (
            <>
              <Typography variant="h5" color="textTertiary" mt={1} mb={1} pt={2}>
                Products
              </Typography>
              {userData.products.map((product) => (
                <Grid item md={2} xs={12} key={product?._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </>
          )} */}
              {userData?.certificates && userData?.certificates?.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    color="textTertiary"
                    mt={1}
                    mb={1}
                    pt={2}
                  >
                    Certificates
                  </Typography>
                  {userData?.certificates?.map((certificate, index) => (
                    <Stack key={index}>
                      <CertificateCard certificate={certificate} />
                    </Stack>
                  ))}{" "}
                </>
              )}{" "}
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
                  <Grid container spacing={2} mt={2}>
                    {userData?.awards?.map((award, index) => (
                      <Grid item xs={6} key={index}>
                        <AwardCard award={award} ismobile />
                      </Grid>
                    ))}
                  </Grid>{" "}
                </>
              )}{" "}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default QRPage;
