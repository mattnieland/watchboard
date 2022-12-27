/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Center,
  Collapse,
  Grid,
  Stack,
  Group,
  SegmentedControl,
  Text,
  Flex,
  LoadingOverlay,
  UnstyledButton,
  Container,
  Kbd,
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
import { useHotkeys } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const leagues = [
  {
    value: "nfl",
    label: (
      <Center>
        <FaFootballBall size={16} />
        <Box ml={10}>
          NFL<Kbd ml={5}>N</Kbd>
        </Box>
      </Center>
    ),
  },
  {
    value: "nba",
    label: (
      <Center>
        <FaBasketballBall size={16} />
        <Box ml={10}>
          NBA<Kbd ml={5}>B</Kbd>
        </Box>
      </Center>
    ),
  },
  {
    value: "mlb",
    label: (
      <Center>
        <FaBaseballBall size={16} />
        <Box ml={10}>
          MLB<Kbd ml={5}>M</Kbd>
        </Box>
      </Center>
    ),
  },
  {
    value: "nhl",
    label: (
      <Center>
        <FaHockeyPuck size={16} />
        <Box ml={10}>
          NHL<Kbd ml={5}>H</Kbd>
        </Box>
      </Center>
    ),
  },
  {
    value: "close",
    label: (
      <Center>
        <Box>
          Close<Kbd ml={5}>Esc</Kbd>
        </Box>
      </Center>
    ),
  },
];

const secondaryFilters = [
  {
    value: "teams",
    label: (
      <Center>
        <FaUsers size={16} />
        <Box ml={10}>
          Teams<Kbd ml={5}>T</Kbd>
        </Box>
      </Center>
    ),
  },
  {
    value: "players",
    label: (
      <Center>
        <FaUser size={16} />
        <Box ml={10}>
          Players<Kbd ml={5}>P</Kbd>
        </Box>
      </Center>
    ),
  },
];

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
  const [teams, setTeams] = useState([] as any);
  const [players, setPlayers] = useState([] as any);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useHotkeys([
    ["n", () => getLeague("nfl")],
    ["b", () => getLeague("nba")],
    ["m", () => getLeague("mlb")],
    ["h", () => getLeague("nhl")],
    ["t", () => switchTeamPlayers("teams")],
    ["p", () => switchTeamPlayers("players")],
    ["escape", () => getLeague("close")],
  ]);

  useEffect(() => {
    getTeams();

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

  const getTeams = async () => {
    setLoading(true);
    setTeams([]);

    let filters = [];
    filters.push("type = team");

    await searchClient
      .index("search")
      .search("", {
        filter: filters,
        limit: 1000000,
      })
      .then((response) => {
        setTeams(response.hits);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getPlayers = async (filter1: string, filter2: string) => {
    setExtraFilter("");

    if (filter1 === "close" || filter1 === "") {
      setFilterCollapsed(true);
      setLoading(false);
    } else {
      let filters = [];
      if (filter1) filters.push(`league = ${filter1}`);
      if (filter2 === "players") filters.push("type = player");

      await searchClient
        .index("search")
        .search("", {
          filter: filters,
          limit: 1000000,
        })
        .then((response) => {
          setPlayers(response.hits);
        });
    }
  };

  const getLeague = (league: string) => {
    setLoading(true);
    setFilter(league);
    setExtraFilter("");
    if (league !== "close") {
      setFilterCollapsed(false);
    } else {
      setFilterCollapsed(true);
    }
    setLoading(false);
  };

  const switchTeamPlayers = (filter: string) => {
    if (filter === "players") {
      getPlayers(filter, filter);
    }
    setSecondaryFilter(filter);
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
          <Stack>
            <Center>
              <SegmentedControl
                value={filter}
                color="blue"
                radius="lg"
                styles={(theme) => ({
                  root: {
                    backgroundColor:
                      theme.colorScheme === "dark" ? "#373c46" : "#dfdfdf",
                  },
                })}
                fullWidth
                onChange={(value) => {
                  getLeague(value);
                }}
                data={leagues}
              />
            </Center>
            <Collapse in={!filterCollapsed} transitionDuration={250}>
              {loading ? (
                <LoadingOverlay visible={loading} />
              ) : (
                <Container
                  fluid
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                    textAlign: "center",
                    padding: theme.spacing.xl,
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
                          <Container>
                            <Center>
                              <SegmentedControl
                                value={secondaryFilter}
                                color="blue"
                                radius="lg"
                                fullWidth
                                styles={(theme) => ({
                                  root: {
                                    backgroundColor:
                                      theme.colorScheme === "dark"
                                        ? "#373c46"
                                        : "#dfdfdf",
                                  },
                                })}
                                defaultValue="teams"
                                onClick={() => {
                                  setExtraFilter("");
                                }}
                                onChange={(value) => {
                                  switchTeamPlayers(value);
                                }}
                                data={secondaryFilters}
                              />
                            </Center>
                          </Container>
                          <Container>
                            {secondaryFilter === "teams" ? (
                              <Center>
                                <Group>
                                  {teams
                                    .filter(
                                      (team: any) =>
                                        team.league === filter &&
                                        !watchItems.includes(team.id)
                                    )
                                    .map((team: any, index: number) => (
                                      <Droppable
                                        key={team.id}
                                        droppableId={team.id}
                                      >
                                        {(provided) => (
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
                                </Group>
                              </Center>
                            ) : (
                              <Center>
                                <Group>
                                  {!extraFilter &&
                                    teams
                                      .filter(
                                        (team: any) =>
                                          team.league === filter &&
                                          !watchItems.includes(team.id)
                                      )
                                      .map((team: any) => (
                                        <UnstyledButton
                                          onClick={() => {
                                            if (secondaryFilter === "players") {
                                              getPlayers(
                                                filter,
                                                secondaryFilter
                                              );
                                            }
                                            setExtraFilter(team.shortName);
                                          }}
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
                                            <Text>{team.shortName}</Text>
                                          </Flex>
                                        </UnstyledButton>
                                      ))}
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
                                          {(provided) => (
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
                                                          player && player.image
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
                              </Center>
                            )}
                          </Container>
                        </Stack>
                      </Center>
                    </Grid.Col>
                  </Grid>
                </Container>
              )}
            </Collapse>
          </Stack>
        </Grid.Col>
        <Grid.Col md={12}>
          <Droppable key="drop-zone" droppableId="watch-board">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Container
                  fluid
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.lg,
                    height: windowSize.innerHeight * 0.8,
                    cursor: "pointer",
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
                </Container>
              </div>
            )}
          </Droppable>
        </Grid.Col>
      </Grid>
    </DragDropContext>
  );
};
export { WatchBoard };
