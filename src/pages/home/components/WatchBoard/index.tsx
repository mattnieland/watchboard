/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Box,
  Center,
  Collapse,
  Grid,
  Stack,
  Group,
  SegmentedControl,
  Title,
  Text,
  Flex,
  LoadingOverlay,
  UnstyledButton,
} from "@mantine/core";
import {
  FaFootballBall,
  FaBasketballBall,
  FaBaseballBall,
  FaHockeyPuck,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MeiliSearch } from "meilisearch";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../../firebase";

const WatchBoard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [secondaryFilter, setSecondaryFilter] = useState("teams");
  const [extraFilter, setExtraFilter] = useState("");
  const [filterCollapsed, setFilterCollapsed] = useState(true);

  const searchClient = new MeiliSearch({
    host: "https://search.scorebrd.live",
    apiKey: process.env.REACT_APP_SEARCH_API_KEY,
  });

  const [watchItems, setWatchItems] = useState([] as any);
  const [allTeams, setAllTeams] = useState([] as any);
  const [teams, setTeams] = useState([] as any);
  const [players, setPlayers] = useState([] as any);
  const [divisions, setDivisions] = useState([] as any);
  const [playerTeams, setPlayerTeams] = useState([] as any);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    getAllTeams();

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const getAllTeams = async () => {
    setLoading(true);

    let filters = [];
    filters.push("type = team");

    await searchClient
      .index("search")
      .search("", {
        filter: filters,
        limit: 1000000,
      })
      .then((response) => {
        let uniqueDivisions = [] as any;
        let uniqueLeagues = [
          ...new Set(response.hits.map((item) => item.league)),
        ].sort();
        uniqueLeagues.forEach((element) => {
          let uniqueLeagueDivisions = [
            ...new Set(
              response.hits
                .filter((item) => item.league === element)
                .map((item) => item.division)
            ),
          ].sort();
          uniqueLeagueDivisions.forEach((division) => {
            uniqueDivisions.push({ league: element, division: division });
          });
        });
        setDivisions(uniqueDivisions);
        setAllTeams(response.hits);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getItems = async (filter1: string, filter2: string) => {
    setLoading(true);
    setExtraFilter("");

    if (filter1 === "close" || filter1 === "") {
      setFilterCollapsed(true);
      setLoading(false);
    } else {
      let filters = [];
      if (filter1) filters.push(`league = ${filter1}`);
      if (filter2 === "teams") filters.push("type = team");
      if (filter2 === "players") filters.push("type = player");

      await searchClient
        .index("search")
        .search("", {
          filter: filters,
          limit: 1000000,
        })
        .then((response) => {
          if (filter2 === "teams") {
            setTeams(response.hits);
          } else {
            setPlayerTeams(
              [
                ...new Set(response.hits.map((item) => item.teamShortName)),
              ].sort()
            );
            setPlayers(response.hits);
          }
        })
        .finally(() => {
          setFilterCollapsed(false);
          setLoading(false);
        });
    }
  };

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        if (!watchItems.includes(source.droppableId)) {
          const items = [...watchItems];
          items.push(source.droppableId);
          setWatchItems(items);
        }
      }}
    >
      <Grid>
        <Grid.Col md={12}>
          <Center>
            <Stack>
              <Center>
                <Group>
                  <SegmentedControl
                    value={filter}
                    color="blue"
                    onChange={(value) => {
                      getItems(value, secondaryFilter);
                      setFilter(value);
                    }}
                    data={[
                      {
                        value: "nfl",
                        label: (
                          <Center>
                            <FaFootballBall size={16} />
                            <Box ml={10}>NFL</Box>
                          </Center>
                        ),
                      },
                      {
                        value: "nba",
                        label: (
                          <Center>
                            <FaBasketballBall size={16} />
                            <Box ml={10}>NBA</Box>
                          </Center>
                        ),
                      },
                      {
                        value: "mlb",
                        label: (
                          <Center>
                            <FaBaseballBall size={16} />
                            <Box ml={10}>MLB</Box>
                          </Center>
                        ),
                      },
                      {
                        value: "nhl",
                        label: (
                          <Center>
                            <FaHockeyPuck size={16} />
                            <Box ml={10}>NHL</Box>
                          </Center>
                        ),
                      },
                      {
                        value: "close",
                        label: (
                          <Center>
                            <Box>Close</Box>
                          </Center>
                        ),
                      },
                    ]}
                  />
                </Group>
              </Center>
              <Collapse in={!filterCollapsed} transitionDuration={500}>
                {loading ? (
                  <LoadingOverlay visible={loading} />
                ) : (
                  <Box
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      textAlign: "center",
                      padding: theme.spacing.xl,
                      width: "1500px",
                      borderRadius: theme.radius.lg,

                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[1],
                      },
                    })}
                  >
                    <Grid>
                      <Grid.Col md={12}>
                        <Center>
                          <Stack>
                            <Box>
                              <Center>
                                <SegmentedControl
                                  value={secondaryFilter}
                                  color="blue"
                                  defaultValue="teams"
                                  onClick={() => {
                                    setExtraFilter("");
                                  }}
                                  onChange={(value) => {
                                    getItems(filter, value);
                                    setSecondaryFilter(value);
                                  }}
                                  data={[
                                    {
                                      value: "teams",
                                      label: (
                                        <Center>
                                          <FaUsers size={16} />
                                          <Box ml={10}>Teams</Box>
                                        </Center>
                                      ),
                                    },
                                    {
                                      value: "players",
                                      label: (
                                        <Center>
                                          <FaUser size={16} />
                                          <Box ml={10}>Players</Box>
                                        </Center>
                                      ),
                                    },
                                  ]}
                                />
                              </Center>
                            </Box>
                            <Grid>
                              {secondaryFilter === "teams" ? (
                                divisions.filter(
                                  (div: any) => div.league === filter
                                ).length > 0 &&
                                divisions
                                  .filter((div: any) => div.league === filter)
                                  .map((division: any) => (
                                    <Grid.Col span={filter !== "mlb" ? 6 : 4}>
                                      <Title>{division.division}</Title>
                                      <Center>
                                        {teams
                                          .filter(
                                            (team: any) =>
                                              team.division ===
                                                division.division &&
                                              !watchItems.includes(team.id)
                                          )
                                          .map((team: any, index: number) => (
                                            <Droppable
                                              key={team.id}
                                              droppableId={team.id}
                                            >
                                              {(provided, snapshot) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.droppableProps}
                                                >
                                                  <Draggable
                                                    key={team.id}
                                                    draggableId={team.id}
                                                    index={index}
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                      >
                                                        <Flex
                                                          direction="column"
                                                          align="center"
                                                        >
                                                          <Avatar
                                                            key={team.id}
                                                            src={
                                                              team && team.image
                                                                ? team.image
                                                                : "avatar.png"
                                                            }
                                                            alt={team.title}
                                                            size="xl"
                                                            radius={50}
                                                          />
                                                          <Text>
                                                            {team.shortName}
                                                          </Text>
                                                        </Flex>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                </div>
                                              )}
                                            </Droppable>
                                          ))}
                                      </Center>
                                    </Grid.Col>
                                  ))
                              ) : (
                                <Grid.Col span={12}>
                                  <Grid>
                                    {!extraFilter &&
                                      divisions.filter(
                                        (div: any) => div.league === filter
                                      ).length > 0 &&
                                      divisions
                                        .filter(
                                          (div: any) => div.league === filter
                                        )
                                        .map((division: any) => (
                                          <Grid.Col
                                            span={filter !== "mlb" ? 6 : 4}
                                          >
                                            <Title>{division.division}</Title>
                                            <Center>
                                              {teams
                                                .filter(
                                                  (team: any) =>
                                                    team.division ===
                                                      division.division &&
                                                    !watchItems.includes(
                                                      team.id
                                                    )
                                                )
                                                .map(
                                                  (
                                                    team: any,
                                                    index: number
                                                  ) => (
                                                    <UnstyledButton
                                                      onClick={() =>
                                                        setExtraFilter(
                                                          team.shortName
                                                        )
                                                      }
                                                    >
                                                      <Flex
                                                        direction="column"
                                                        align="center"
                                                      >
                                                        <Avatar
                                                          key={team.id}
                                                          src={
                                                            team && team.image
                                                              ? team.image
                                                              : "avatar.png"
                                                          }
                                                          alt={team.title}
                                                          size="xl"
                                                          radius={50}
                                                        />
                                                        <Text>
                                                          {team.shortName}
                                                        </Text>
                                                      </Flex>
                                                    </UnstyledButton>
                                                  )
                                                )}
                                            </Center>
                                          </Grid.Col>
                                        ))}
                                  </Grid>                                  
                                  <Group>
                                    {extraFilter &&
                                      players
                                        .filter(
                                          (player: any) =>
                                            player.teamShortName ===
                                              extraFilter &&
                                            !watchItems.includes(player.id)
                                        )
                                        .map((player: any, index: number) => (
                                          <Droppable
                                            key={player.id}
                                            droppableId={player.id}
                                          >
                                            {(provided, snapshot) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                              >
                                                <Draggable
                                                  key={player.id}
                                                  draggableId={player.id}
                                                  index={index}
                                                >
                                                  {(provided) => (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                    >
                                                      <Flex
                                                        direction="column"
                                                        align="center"
                                                      >
                                                        <Avatar
                                                          key={player.id}
                                                          src={
                                                            player &&
                                                            player.image
                                                              ? player.image
                                                              : "avatar.png"
                                                          }
                                                          size="xl"
                                                          radius={50}
                                                        />
                                                        <Text>
                                                          {player.shortName}
                                                        </Text>
                                                      </Flex>
                                                    </div>
                                                  )}
                                                </Draggable>
                                              </div>
                                            )}
                                          </Droppable>
                                        ))}
                                  </Group>
                                </Grid.Col>
                              )}
                            </Grid>
                          </Stack>
                        </Center>
                      </Grid.Col>
                    </Grid>
                  </Box>
                )}
              </Collapse>
            </Stack>
          </Center>
        </Grid.Col>
        <Grid.Col md={12}>
          <Center>
            <Droppable key="drop-zone" droppableId="watch-board">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      textAlign: "center",
                      padding: theme.spacing.xl,
                      width: "1900px",
                      height: "720px",
                      borderRadius: theme.radius.lg,

                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[1],
                      },
                    })}
                  >
                    <Center>
                      {watchItems.length === 0 ? (
                        <Text>
                          Drag and drop players or teams here to watch them
                        </Text>
                      ) : (
                        watchItems.map((item: any, index: number) => (
                          <p>{item}</p>
                        ))
                      )}
                    </Center>
                  </Box>
                </div>
              )}
            </Droppable>
          </Center>
        </Grid.Col>
      </Grid>
    </DragDropContext>
  );
};
export { WatchBoard };
